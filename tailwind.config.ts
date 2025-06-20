
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
				ibm: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
				inter: ['Inter', 'Helvetica Now', 'Arial', 'sans-serif'],
			},
			colors: {
				columbiablue: "#9BDDFF",
				teal: "#20B2AA",
				graphite: "#282A36",
				medicalsilver: "#DEE3E6",
				ultramarine: "#2D3B75",
				gold: "#D4AF37",
			},
			boxShadow: {
				'glow': "0 0 16px 4px rgba(155,221,255,0.32)",
				'glass': "0 4px 32px 0 rgba(40,45,80,0.12)",
				'magical': "0 8px 32px 0 rgba(251,191,36,0.12)",
			},
			backdropBlur: {
				glass: '18px'
			},
			borderRadius: {
				glass: '1.75rem'
			},
			gradientColorStops: theme => ({
				'primary': '#9BDDFF',
				'accent': '#20B2AA',
				'ultramarine': '#2D3B75',
				'magical': '#D4AF37',
			}),
			backgroundImage: {
				'bio-gradient': "linear-gradient(135deg, #f8fbff 60%, #9BDDFF 100%)",
				'magical-gradient': "linear-gradient(135deg, #fef3c7 0%, #f3f4f6 50%, #dbeafe 100%)",
			},
			animation: {
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			keyframes: {
				'pulse': {
					'0%, 100%': { opacity: 1 },
					'50%': { opacity: 0.74 }
				}
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
