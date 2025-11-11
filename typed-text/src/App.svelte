<script lang="ts">
  import TypedText from "./TypedText";

  const textStyles = {
    summary: "Hello World!",
    full: "Hello World! This is a full text that demonstrates the typing animation works with longer content. The text will appear character by character, creating an engaging visual effect for the user.",
    other: "This is an alternative text.",
    none: "",
  };

  let activeTextStyle = $state<keyof typeof textStyles>("summary");
  // svelte-ignore state_referenced_locally
  let text = $state(textStyles[activeTextStyle]);
  // svelte-ignore state_referenced_locally
  const typedText = new TypedText(text, (value) => (text = value));

  function setTextStyle(style: keyof typeof textStyles) {
    activeTextStyle = style;
    typedText.target = textStyles[activeTextStyle];
  }
</script>

<main>
  {text}
</main>

<nav>
  <h2>TEXT STYLE</h2>
  <div class="button-group">
    {#each Object.keys(textStyles) as style (style)}
      <button
        class:active={activeTextStyle === style}
        onclick={() => setTextStyle(style as keyof typeof textStyles)}
      >
        {style.toUpperCase()}
      </button>
    {/each}
  </div>
</nav>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&family=Knewave&display=swap");

  :global(html, body, #app) {
    height: 100%;
    margin: 0;
    background-color: darkslategray;
  }

  :global(#app) {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
    color: white;
    font-size: 2rem;
    padding: 2rem;
    box-sizing: border-box;
    overflow: auto;
    text-align: center;
  }

  main,
  nav * {
    font-family: "Cherry Bomb One", system-ui;
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 0 2rem 2rem 2rem;
    box-sizing: border-box;
  }

  nav h2 {
    margin: 0;
    color: white;
    font-size: 1.2rem;
    font-weight: normal;
  }

  nav .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  nav button {
    background-color: #2f4f4f;
    border: 1px solid white;
    border-radius: 10rem;
    padding: 0.5rem 1rem;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  nav button.active {
    background-color: white;
    color: darkslategray;
  }

  nav button:hover {
    transform: scale(1.05);
  }

  nav button:active {
    transform: scale(0.95);
  }
</style>
