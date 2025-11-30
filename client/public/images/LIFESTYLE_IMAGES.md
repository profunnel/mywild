# Contextual Lifestyle Images - Placeholder Reference

## Current Assets (Existing Images)

Located in `client/public/images/`:

### Available Stock Images
- **pets_ticks.png** (904KB) - Can be used for prevention/educational content showing tick awareness

### Placeholder Strategy

For the 6 required lifestyle images, we'll use the following approach until proper images are generated:

1. **prevention-clothing.jpg** - MISSING
   - Use CSS gradient placeholder or generic hiking image
   - Alt: "Protective clothing for tick prevention"

2. **prevention-yard.jpg** - MISSING
   - Use CSS gradient placeholder
   - Alt: "Well-maintained yard with short grass and wood chip barrier"

3. **prevention-check.jpg** - MISSING
   - Temporarily use `pets_ticks.png` as it shows tick awareness
   - Alt: "Person checking for ticks after outdoor activity"

4. **nature-acorns.jpg** - MISSING
   - Use CSS gradient placeholder
   - Alt: "Oak acorns on forest floor, common tick habitat indicator"

5. **nature-mouse.jpg** - MISSING
   - Use CSS gradient placeholder
   - Alt: "White-footed mouse, primary tick host"

6. **habitat-tallgrass.jpg** - MISSING
   - Use CSS gradient placeholder
   - Alt: "Tall grass meadow, common tick habitat"

## Temporary CSS Placeholder Solution

Until images are generated, use CSS gradients in components:

```css
.lifestyle-image-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  border-radius: var(--radius-md);
}
```

## Future Work

When ready to replace placeholders, generate images as specified in backlog:
- Prevention clothing (hiking boots, tucked pants)
- Manicured yard (aerial view)
- Tick check demonstration
- Acorns on forest floor
- White-footed mouse
- Tall grass meadow

All images should be:
- WebP format
- Target size: <200KB
- Aspect ratio: 16:9 or 4:3 (consistent)
- Descriptive alt text (10+ words)

## Status

⚠️ Using placeholders - 6/6 images missing  
✅ Strategy documented for development  
⏳ Generate proper images when quota allows
