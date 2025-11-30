# Scientific Illustrations - Placeholder Reference

## Current Assets (Stock Images)

Located in `client/public/images/`:

### Tick Species
- **deer_tick.png** (904KB) - Use for Deer Tick (Ixodes scapularis)
- **dog_tick.png** (762KB) - Use for American Dog Tick (Dermacentor variabilis)
- **lone_star_tick.png** (800KB) - Use for Lone Star Tick (Amblyomma americanum)

### Medical/Educational
- **tick_bite_rash.png** (821KB) - Use for Lyme disease bullseye rash illustration
- **pets_ticks.png** (904KB) - Optional: Use for prevention/educational content

## Missing Assets (To Be Generated Later)

When ready to replace placeholders, generate:

1. **tick-lifecycle.png** - Circular diagram showing egg → larva → nymph → adult stages
   - Prompt: "Infographic of tick life cycle: egg, larva (6 legs), nymph (8 legs), adult (8 legs), circular flow diagram, clean minimal icons, educational style, white background"

## Usage in Components

```jsx
// Example usage in ContentBlock or FeatureGrid
<img 
  src="/images/deer_tick.png" 
  alt="Female Deer Tick (Ixodes scapularis) showing characteristic reddish-brown body and black scutum shield"
  loading="lazy"
/>
```

## Optimization Notes

All existing images are PNG format. Consider converting to WebP for better compression:
- Target size: <200KB per image
- Use responsive srcset for different viewport sizes
- Ensure descriptive alt text (10+ words) for SEO

## Status

✅ Using existing stock images as placeholders  
⏳ Lifecycle diagram - to be created later  
⏳ Consider WebP conversion for optimization
