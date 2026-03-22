import { renderCard } from './cardRenderer.js';
import fs from 'fs';

async function run() {
  console.log("Generating Quote Card...");
  const quoteBuffer = await renderCard({
    text: "Your coding prowess is your product's biggest enemy.",
    format: "square",
    template: "quote",
    theme: "dark"
  }) as Buffer;
  fs.writeFileSync('quote.png', quoteBuffer);
  console.log("Saved quote.png");
  
  console.log("Generating Insight Card...");
  const insightBuffer = await renderCard({
    text: "Small lies don't just deceive others; they rewire *you*.\n\nYou tell your colleague you’ve read the entire 20-page proposal, but you only skimmed the executive summary. Later, when the meeting shifts to a specific data point, your eyes dart around the room.\n\nYou are what you repeatedly accept from yourself.",
    format: "portrait",
    template: "insight",
    theme: "light"
  }) as Buffer;
  fs.writeFileSync('insight.png', insightBuffer);
  console.log("Saved insight.png");

  console.log("Generating Carousel Cards...");
  const carouselBuffers = await renderCard({
    text: "Motivation is a liar. It shows up when it’s convenient. Leaves when things get hard. Consistency doesn’t care how you feel. It just shows up. That’s the difference. One feels good. The other actually changes your life. So today— what are you doing even if you don’t feel like it?",
    format: "square",
    template: "carousel",
    theme: "dark"
  }) as Buffer[];
  
  carouselBuffers.forEach((buf, idx) => {
    fs.writeFileSync(`slide_${idx+1}.png`, buf);
    console.log(`Saved slide_${idx+1}.png`);
  });
}

run().catch(console.error);
