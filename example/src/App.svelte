<script lang="ts">
  import TypedText from "../../TypedText";

  const GITHUB_URL = "https://github.com/shilo/typed-text";

  const textStyles = {
    short: "Hello World!",
    medium:
      "Hello World! This is text that demonstrates the typing animation works with longer content.",
    full: "Hello World! This is text that demonstrates the typing animation works with longer content. The text will appear character by character, creating an engaging visual effect for the user.",
    other: "This is an alternative text.",
    none: "",
  };

  let animatePerCharacter = $state(false);
  let activeTextStyle = $state<keyof typeof textStyles>("full");
  let text = $state("");
  const typedText = new TypedText("", (value) => (text = value));
  // svelte-ignore state_referenced_locally
  typedText.target = textStyles[activeTextStyle];

  updateAnimationMode();

  function setTextStyle(style: keyof typeof textStyles) {
    activeTextStyle = style;
    typedText.target = textStyles[activeTextStyle];
  }

  function toggleAnimationMode() {
    animatePerCharacter = !animatePerCharacter;
    updateAnimationMode();
  }

  function updateAnimationMode() {
    typedText.animatePerCharacter = animatePerCharacter;
    typedText.animationDurationSeconds = animatePerCharacter ? 0.01 : 1.0;
  }
</script>

<header>
  <span>TypedText</span>
  <a
    href={GITHUB_URL}
    target="_blank"
    rel="noopener noreferrer"
    class="github-link"
    aria-label="View on GitHub"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
      />
    </svg>
  </a>
</header>

<main>
  {text}
</main>

<nav>
  <h2>TEXT STYLE</h2>
  <label class="toggle-label">
    <input
      type="checkbox"
      checked={animatePerCharacter}
      onchange={toggleAnimationMode}
    />
    ANIMATE PER CHARACTER
  </label>
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

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem 0 2rem;
    font-size: 1.5rem;
    color: white;
  }

  header .github-link {
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
  }

  header .github-link:hover {
    opacity: 0.7;
    transform: scale(1.1);
  }

  header .github-link:active {
    transform: scale(0.95);
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
  header,
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

  nav .toggle-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    border: 1px solid white;
    border-radius: 10rem;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
  }

  nav .toggle-label:hover {
    transform: scale(1.05);
  }

  nav .toggle-label:active {
    transform: scale(0.95);
  }

  nav .toggle-label input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background-color: #2f4f4f;
    border: 1px solid white;
    border-radius: 0.25rem;
    position: relative;
    transition: all 0.3s ease;
  }

  nav .toggle-label input[type="checkbox"]:checked {
    background-color: white;
    border-color: white;
  }

  nav .toggle-label input[type="checkbox"]:checked::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: darkslategray;
    font-size: 0.9rem;
    font-weight: bold;
  }
</style>
