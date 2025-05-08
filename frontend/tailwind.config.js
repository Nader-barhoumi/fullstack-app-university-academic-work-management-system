/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
    "./server.ts"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-blue-600',
    'bg-blue-700',
    'bg-gray-500',
    'bg-gray-700',
    'bg-red-600',
    'bg-red-700',
    'text-white',
    'hover:bg-blue-700',
    'hover:bg-gray-700',
    'hover:bg-red-700',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-gray-400',
    'focus:ring-opacity-50',
    'focus:ring-blue-500',
    'focus:border-blue-500',
    'input-field-alt',
    'btn-primary',
    'btn-secondary',
    'btn-danger'
  ]
}
