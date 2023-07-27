import { keyframes, style } from '@vanilla-extract/css'
import { darken } from 'polished'

import { sprinkles } from './sprinkles.css'

const loadingAnimation = keyframes({
  '0%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0% 50%',
  },
})

export const loadingBlock = style([
  {
    animation: `${loadingAnimation} 1.5s infinite`,
    animationFillMode: 'both',
    background: `linear-gradient(45deg, #ac50ef, #7059fb 50%, #2ecff6)`,
    backgroundSize: '400%',
    willChange: 'background-position',
  },
])

export const loadingAsset = style([
  loadingBlock,
  sprinkles({
    borderRadius: '12',
    cursor: 'default',
    color: 'transparent',
  }),
  {
    userSelect: 'none',
  },
])
