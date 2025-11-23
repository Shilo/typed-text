# TypedText

A lightweight TypeScript class for creating smooth, animated text typing effect. TypedText provides configurable animation duration and supports both character-by-character and bulk animation modes.

## Features

- 🎬 Smooth text typing animations
- ⚙️ Configurable animation duration
- 🔄 Character-by-character or bulk animation modes
- 🎛️ Configurable reset animation behavior (On No Match, Always, Never)
- 📦 Zero dependencies
- 🎯 TypeScript support
- 🔌 Callback-based updates
- 🧹 Auto-cleanup when destroyed

## Download and Installation

### Option 1: Direct Download

Simply download the `TypedText.ts` file from this repository and include it in your project:

```bash
# Clone the repository
git clone https://github.com/shilo/typed-text.git

# Or download just the TypedText.ts file
```

### Option 2: Copy the File

Copy the `TypedText.ts` file directly into your project directory. The file is standalone and has no external dependencies.

## Usage

### Basic Example

```typescript
import TypedText from './TypedText';

// Create an instance with an initial value and update callback
const typedText = new TypedText("", (currentValue) => {
    console.log(currentValue);
    // Update your UI with currentValue
});

// Set the target text to animate to
typedText.target = "Hello, World!";
```

### With React/Vue/Svelte

```typescript
import TypedText from './TypedText';

// In your component
const [displayText, setDisplayText] = useState("");
const typedText = new TypedText("", (value) => setDisplayText(value));

// Update target text
typedText.target = "New text to display";
```

### Configuration Options

```typescript
import TypedText, { ResetAnimationType } from './TypedText';

// Set animation duration (in seconds)
typedText.animationDurationSeconds = 2.0; // Default: 1.0

// Enable character-by-character animation
typedText.animatePerCharacter = true; // Default: false

// Configure reset animation behavior
typedText.resetAnimationType = ResetAnimationType.OnNoMatch; // Reset only if current and target don't match (default)
typedText.resetAnimationType = ResetAnimationType.Always; // Always reset to empty before animating
typedText.resetAnimationType = ResetAnimationType.Never; // Never reset, continue from current position

// Check if animation is currently running
if (typedText.isAnimating) {
    console.log("Animation in progress");
}

// Get current displayed text
const current = typedText.current;

// Get target text
const target = typedText.target;

// Auto-destroy by setting target to null/undefined
typedText.target = null; // Stops animation and cleans up resources
typedText.target = undefined; // Same as null

// Or manually destroy
typedText.destroy();
```

## API Reference

### Enums

#### `ResetAnimationType`

Controls how the animation resets when the target text changes:

- `ResetAnimationType.OnNoMatch` **(default)**: Resets to empty only if the current text and target text don't partially match
- `ResetAnimationType.Always`: Always resets the current text to empty before animating to the new target
- `ResetAnimationType.Never`: Never resets, continues animating from the current position

### Constructor

```typescript
new TypedText(initialValue?: string, onUpdate?: (value: string) => void)
```

- `initialValue` (optional): The initial text value. Defaults to empty string.
- `onUpdate` (optional): Callback function called whenever the displayed text changes.

### Properties

#### `target: string | null | undefined`
Sets the target text to animate to. When changed, automatically starts the animation. Setting to `null` or `undefined` will automatically destroy the instance, stopping all animations and clearing resources.

#### `current: string` (read-only)
Gets the currently displayed text value.

#### `animationDurationSeconds: number`
Sets the duration of the animation in seconds. Default: `1.0`.

#### `animatePerCharacter: boolean`
When `true`, animates one character at a time. When `false`, animates multiple characters per frame for smoother performance. Default: `false`.

#### `resetAnimationType: ResetAnimationType`
Controls how the animation resets when the target text changes. See `ResetAnimationType` enum for available options. Default: `ResetAnimationType.OnNoMatch`.

#### `isAnimating: boolean` (read-only)
Returns `true` if an animation is currently in progress.

#### `isAnimatable: boolean` (read-only)
Returns `true` if animation is enabled (duration >= 0).

#### `onUpdate?: (currentValue: string) => void`
Callback function that gets called whenever the displayed text changes.

### Methods

#### `destroy(): void`
Manually destroys the instance, stopping any running animations, clearing the current and target text, and removing the update callback. This method is automatically called when `target` is set to `null` or `undefined`.

#### `toString(): string`
Returns the current displayed text value. Useful for string interpolation.

## Running the Example Project

The `example` directory contains a Svelte 5 application that demonstrates TypedText in action.

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Setup and Run

1. **Navigate to the example directory:**
   ```bash
   cd example
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The terminal will display a local URL (typically `http://localhost:5173`). Open this URL in your browser to see the TypedText demo.

### Example Project Features

The example project demonstrates:
- Different text styles (short, medium, full, other, none)
- Toggle between character-by-character and bulk animation modes
- Reset animation type selector (Always, On No Match, Never)
- Real-time text updates
- Interactive UI to test various configurations

### Build for Production

To build the example project for production:

```bash
npm run build
```

The built files will be in the `dist` directory. Preview the production build with:

```bash
npm run preview
```

### Type Checking

To run TypeScript type checking:

```bash
npm run check
```

## How It Works

TypedText uses an interval-based animation system that:

1. Calculates the optimal animation timing based on the number of characters to animate
2. Updates the displayed text incrementally
3. Handles both adding and removing characters
4. Automatically stops when the target is reached
5. Intelligently handles related text transitions based on the `resetAnimationType` setting:
   - **Always**: Resets to empty before every animation
   - **On No Match**: Continues from current position if texts partially match (e.g., "Hello" → "Hello World"), otherwise resets
   - **Never**: Always continues from current position, adjusting only the necessary characters

## Browser Support

TypedText works in all modern browsers that support:
- ES6+ JavaScript
- `setInterval` and `clearInterval`

## License

This project is open source and available for use in your projects.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

