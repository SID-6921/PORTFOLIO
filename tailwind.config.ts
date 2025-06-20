
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
				sans: ['Inter', 'ui-sans-serif', 'system-ui'],
				inter: ['Inter', 'ui-sans-serif', 'system-ui'],
				ibm: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
			},
			colors: {
				columbiablue: "#9BDDFF",
				teal: "#20B2AA",
				graphite: "#2F3349",
				medicalsilver: "#F8FAFC",
				ultramarine: "#1E40AF",
				gold: "#D4AF37",
			},
			boxShadow: {
				'glow': "0 4px 20px -2px rgba(59, 130, 246, 0.15)",
				'glass': "0 4px 24px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
				'professional': "0 8px 32px -8px rgba(0, 0, 0, 0.12), 0 4px 16px -4px rgba(0, 0, 0, 0.08)",
			},
			backdropBlur: {
				glass: '12px'
			},
			borderRadius: {
				glass: '12px'
			},
			gradientColorStops: theme => ({
				'primary': '#3B82F6',
				'accent': '#20B2AA',
				'professional': '#1E40AF',
				'medical': '#059669',
			}),
			backgroundImage: {
				'professional-gradient': "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
				'medical-gradient': "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
			},
			animation: {
				'fade-in': 'fadeIn 0.6s ease-out',
				'slide-up': 'slideUp 0.8s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
