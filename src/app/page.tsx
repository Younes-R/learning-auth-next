export default function Page() {
  return (
    <main>
      <h1>Public Page</h1>
      <p
        style={{
          padding: "1em 3em",
        }}
      >
        This page has public content. You do not need to be authenticated to access it.
      </p>
    </main>
  );
}
