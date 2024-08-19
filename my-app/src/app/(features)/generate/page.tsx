export default function GenFlashcardsHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      Files taking: pdf, video, audio, image, text. <br />
      Description: put in instructions on how I could make flashcards that are best suited for you.
      <TestFlashCard />
    </main>
  );
}

const TestFlashCard = () => {
  return (
    <div>
      <h1>Test Flash Card</h1>
    </div>
  );
};
