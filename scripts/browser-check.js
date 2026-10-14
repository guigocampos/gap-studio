async (page) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const reports = [];
  for (const width of [375, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 950 });
    await page.goto("http://127.0.0.1:5197");
    await page.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll("img").forEach((image) => {
        image.loading = "eager";
      });
      await Promise.all([...document.images].map((image) => image.decode()));
      document
        .querySelectorAll(".reveal")
        .forEach((element) => element.classList.add("revealed"));
    });
    const layout = await page.evaluate(() => ({
      viewport: innerWidth,
      pageWidth: document.documentElement.scrollWidth,
      brokenImages: [...document.images].filter((image) => !image.naturalWidth)
        .length,
      headingCount: document.querySelectorAll("h1").length,
      headingWidth: document.querySelector("h1").getBoundingClientRect().width,
      missingAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(
        (a) => !document.getElementById(a.hash.slice(1)),
      ).length,
      fontsLoaded:
        document.fonts.check("16px Anton") &&
        document.fonts.check('16px "DM Sans"'),
    }));
    if (
      layout.pageWidth > width ||
      layout.brokenImages ||
      layout.headingCount !== 1 ||
      layout.missingAnchors ||
      !layout.fontsLoaded
    )
      throw new Error(JSON.stringify(layout));
    for (const key of ["cabelos", "sobrancelhas", "unhas"]) {
      const card = page.locator(`[data-service="${key}"]`);
      await card.click();
      if (
        !(await page
          .locator("#booking-dialog")
          .evaluate((dialog) => dialog.open))
      )
        throw new Error("Booking triage did not open: " + key);
      const expectedArea = {
        cabelos: "Cabelos",
        sobrancelhas: "Sobrancelhas",
        unhas: "Unhas (manicure ou pedicure)",
      }[key];
      if ((await page.locator("#booking-area").inputValue()) !== expectedArea)
        throw new Error("Service area was not preselected: " + key);
      await page.locator("#service-context summary").click();
      if (
        key === "unhas" &&
        !(await page
          .locator("#dialog-services")
          .innerText()
          .then(
            (text) => text.includes("Manicure") && text.includes("Pedicure"),
          ))
      )
        throw new Error("Missing manicure or pedicure");
      await page.keyboard.press("Escape");
      if (
        await page.locator("#booking-dialog").evaluate((dialog) => dialog.open)
      )
        throw new Error("Escape did not close dialog");
      if (
        !(await card.evaluate((element) => document.activeElement === element))
      )
        throw new Error("Dialog did not restore focus");
    }
    await page.locator("#previous-result").click();
    if ((await page.locator("#result-index").innerText()) !== "04")
      throw new Error("Previous wrap failed");
    await page.locator("#next-result").click();
    if ((await page.locator("#result-index").innerText()) !== "01")
      throw new Error("Next wrap failed");
    await page.locator("#next-result").click();
    if (
      (await page.locator("#result-caption").innerText()) !==
      "O detalhe do olhar"
    )
      throw new Error("Caption failed");
    await page.locator("#previous-result").click();
    await page.locator(".header-book").click();
    if (!(await page.locator("#booking-dialog").evaluate((dialog) => dialog.open)))
      throw new Error("Header did not open booking triage");
    await page.keyboard.press("Escape");
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
    });
    await page.screenshot({
      path: `evidence/${width < 600 ? "mobile" : "desktop"}-${width}.png`,
      fullPage: true,
      animations: "disabled",
    });
    reports.push({
      width,
      ...layout,
      dialogs: "3 passed",
      carousel: "wrap and captions passed",
      booking: "passed",
    });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:5197");
  const reducedMotion = await page.evaluate(() => ({
    preference: matchMedia("(prefers-reduced-motion: reduce)").matches,
    sealAnimation: getComputedStyle(document.querySelector(".hero-seal svg"))
      .animationName,
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  if (reducedMotion.sealAnimation !== "none" || reducedMotion.scroll !== "auto")
    throw new Error("Reduced motion failed");
  await page.locator('[data-service="cabelos"]').focus();
  await page.keyboard.press("Enter");
  if (
    !(await page.locator("#booking-dialog").evaluate((dialog) => dialog.open))
  )
    throw new Error("Keyboard activation failed");
  await page.keyboard.press("Escape");
  await page.locator(".booking-info [data-booking-open]").click();
  await page.locator("#booking-name").fill("Joana de Teste");
  await page.locator("#booking-area").selectOption("Pedicure");
  await page.locator("#booking-procedure").fill("Pedicure");
  await page.locator("#booking-date").fill("2030-08-20");
  await page.locator("#booking-period").selectOption("Tarde");
  await page.locator("#booking-observations").fill("Primeira visita");
  await page.evaluate(() => {
    window.__bookingWhatsappUrl = "";
    window.open = (url) => {
      window.__bookingWhatsappUrl = String(url);
      return { opener: null };
    };
  });
  await page.locator('#booking-form button[type="submit"]').click();
  const whatsapp = await page.evaluate(() => ({
    url: window.__bookingWhatsappUrl,
    message: new URL(window.__bookingWhatsappUrl).searchParams.get("text"),
  }));
  if (
    !whatsapp.url.startsWith("https://wa.me/5513991201050?") ||
    !whatsapp.message.includes("Área: Pedicure") ||
    !whatsapp.message.includes("Dia de preferência: 20/08/2030") ||
    !whatsapp.message.includes("Observações: Primeira visita")
  )
    throw new Error("Booking details were not composed for the official WhatsApp");
  await page.setViewportSize({ width: 320, height: 800 });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error("320px reflow overflow");
  if (errors.length) throw new Error(errors.join("\n"));
  return {
    reports,
    reducedMotion,
    reflow320: "passed",
    consoleErrors: errors,
    keyboard: "Enter, Escape, focus restoration passed",
  };
}

