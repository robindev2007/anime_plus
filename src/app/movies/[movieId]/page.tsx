import React from "react";
import puppeteer from "puppeteer";

async function MoviePage({}: { params: Promise<{ movieId: string }> }) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto("https://developer.chrome.com/");

  // Set screen size.
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box.
  await page.locator(".devsite-search-field").fill("automate beyond recorder");

  // Wait and click on first result.
  await page.locator(".devsite-result-item-link").click();

  await page.screenshot();

  // Locate the full title with a unique string.
  const textSelector = await page
    .locator("text/Customize and automate")
    .waitHandle();
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the full title.
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();

  return <div></div>;
}

export default MoviePage;

// https://fibwatch.shop/watch/bigg-boss-2024-s18e91-hindi-jc-web-dl-480p_xoAzyHROLZAZ2dL.html

// https://link.onlinekosh.com/st?api=df834547799018871c89f7d36db8809642ef96da&url=https://fibwatch.shop/watch/bigg-boss-2024-s18e91-hindi-jc-web-dl-480p_xoAzyHROLZAZ2dL.html

// https://pondit.xyz/?wpsafelink=S6AB8Oj7G7wApbsCadfEeFlgiHnikRmxPR2loRGp0YW9HSzE3Vy95U0lOZG8zWW5xcm96RTlkZWRSU0pUZ0xLOUpGZmE2R1lsS0hqT3VLdEZidStQNw==

// https://pondit.xyz/?safelink_redirect=eyJzZWNvbmRfc2FmZWxpbmtfdXJsIjoiIiwic2FmZWxpbmsiOiJodHRwczpcL1wvbGluay5vbmxpbmVrb3NoLmNvbVwvTkxPVk1rOCJ9

// https://link.onlinekosh.com/NLOVMk8

// https://fibwatch.shop/watch/bigg-boss-2024-s18e91-hindi-jc-web-dl-480p_xoAzyHROLZAZ2dL.html

// 2

// https://link.onlinekosh.com/st?api=df834547799018871c89f7d36db8809642ef96da&url=https://fibwatch.shop/watch/kothin-purush-2004-bengali-web-dl-720p_CgV7dSw1MFBJJ6K.html

// https://link.onlinekosh.com/st?api=df834547799018871c89f7d36db8809642ef96da&url=https://fibwatch.shop/watch/kothin-purush-2004-bengali-web-dl-720p_CgV7dSw1MFBJJ6K.html

// https://pondit.xyz/?safelink_redirect=eyJzZWNvbmRfc2FmZWxpbmtfdXJsIjoiIiwic2FmZWxpbmsiOiJodHRwczpcL1wvbGluay5vbmxpbmVrb3NoLmNvbVwvWWZhSyJ9

// https://link.onlinekosh.com/YfaK
