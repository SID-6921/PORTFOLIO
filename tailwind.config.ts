
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
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				md: '2rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui'],
				inter: ['Inter', 'ui-sans-serif', 'system-ui'],
				ibm: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
			},
			colors: {
				columbiablue: "#3B82F6",
				teal: "#06B6D4",
				graphite: "#1F2937",
				medicalsilver: "#F8FAFC",
				ultramarine: "#2563EB",
				gold: "#D4AF37",
			},
			boxShadow: {
				'glow': "0 4px 32px -8px rgba(59, 130, 246, 0.25)",
				'glass': "0 8px 32px -8px rgba(0, 0, 0, 0.08), 0 4px 16px -4px rgba(0, 0, 0, 0.04)",
				'professional': "0 20px 48px -12px rgba(0, 0, 0, 0.12), 0 8px 24px -8px rgba(0, 0, 0, 0.08)",
				'soft': "0 4px 24px -4px rgba(0, 0, 0, 0.06)",
			},
			backdropBlur: {
				glass: '16px'
			},
			borderRadius: {
				glass: '16px',
				'2xl': '16px'
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
			screens: {
				'xs': '480px',
			},
			animation: {
				'fade-in': 'fadeIn 0.8s ease-out',
				'slide-up': 'slideUp 1s ease-out',
				'scale-in': 'scaleIn 0.6s ease-out',
				'bounce-subtle': 'bounceSubtle 2s infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				bounceSubtle: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				}
			}
		},
		typography: {
			DEFAULT: {
				css: {
					maxWidth: 'none',
					color: 'inherit',
					a: {
						color: 'inherit',
						textDecoration: 'none',
						fontWeight: '500',
					},
					'[class~="lead"]': {
						color: 'inherit',
					},
					strong: {
						color: 'inherit',
						fontWeight: '600',
					},
					'ol[type="A"]': {
						'--list-counter-style': 'upper-alpha',
					},
					'ol[type="a"]': {
						'--list-counter-style': 'lower-alpha',
					},
					'ol[type="A" s]': {
						'--list-counter-style': 'upper-alpha',
					},
					'ol[type="a" s]': {
						'--list-counter-style': 'lower-alpha',
					},
					'ol[type="I"]': {
						'--list-counter-style': 'upper-roman',
					},
					'ol[type="i"]': {
						'--list-counter-style': 'lower-roman',
					},
					'ol[type="I" s]': {
						'--list-counter-style': 'upper-roman',
					},
					'ol[type="i" s]': {
						'--list-counter-style': 'lower-roman',
					},
					'ol[type="1"]': {
						'--list-counter-style': 'decimal',
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
