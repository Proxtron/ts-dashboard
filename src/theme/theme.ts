import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
    theme: {
        tokens: {
            fonts: {
                heading: { value: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
                body: { value: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
            },
            colors: {
                // Minimalist neutral palette
                neutral: {
                    50: { value: "#fafafa" },
                    100: { value: "#f5f5f5" },
                    200: { value: "#e5e5e5" },
                    300: { value: "#d4d4d4" },
                    400: { value: "#a3a3a3" },
                    500: { value: "#737373" },
                    600: { value: "#525252" },
                    700: { value: "#404040" },
                    800: { value: "#262626" },
                    900: { value: "#171717" },
                    950: { value: "#0a0a0a" },
                },
                // Subtle accent - warm earth tone
                accent: {
                    50: { value: "#faf8f5" },
                    100: { value: "#f2ede3" },
                    200: { value: "#e4d9c6" },
                    300: { value: "#d1bfa0" },
                    400: { value: "#bea57a" },
                    500: { value: "#a88b5f" },
                    600: { value: "#8f7350" },
                    700: { value: "#755d43" },
                    800: { value: "#614d39" },
                    900: { value: "#524131" },
                },
                error: {
                    50: { value: "#fef2f2" },
                    100: { value: "#fee2e2" },
                    200: { value: "#fecaca" },
                    300: { value: "#fca5a5" },
                    400: { value: "#f87171" },
                    500: { value: "#ef4444" },
                    600: { value: "#dc2626" },
                    700: { value: "#b91c1c" },
                    800: { value: "#991b1b" },
                    900: { value: "#7f1d1d" },
                },
            },
        },
        semanticTokens: {
            colors: {
                // Background tokens
                "bg.canvas": {
                    value: {
                        _light: "{colors.neutral.50}",
                        _dark: "{colors.neutral.950}",
                    },
                },
                "bg.surface": {
                    value: {
                        _light: "white",
                        _dark: "{colors.neutral.900}",
                    },
                },
                "bg.subtle": {
                    value: {
                        _light: "{colors.neutral.100}",
                        _dark: "{colors.neutral.800}",
                    },
                },
                // Text tokens
                "text.primary": {
                    value: {
                        _light: "{colors.neutral.900}",
                        _dark: "{colors.neutral.100}",
                    },
                },
                "text.secondary": {
                    value: {
                        _light: "{colors.neutral.600}",
                        _dark: "{colors.neutral.400}",
                    },
                },
                "text.muted": {
                    value: {
                        _light: "{colors.neutral.500}",
                        _dark: "{colors.neutral.500}",
                    },
                },
                // Border tokens
                "border.subtle": {
                    value: {
                        _light: "{colors.neutral.200}",
                        _dark: "{colors.neutral.800}",
                    },
                },
                "border.default": {
                    value: {
                        _light: "{colors.neutral.300}",
                        _dark: "{colors.neutral.700}",
                    },
                },
                // Accent tokens
                "accent.default": {
                    value: {
                        _light: "{colors.accent.600}",
                        _dark: "{colors.accent.400}",
                    },
                },
                "accent.emphasis": {
                    value: {
                        _light: "{colors.accent.700}",
                        _dark: "{colors.accent.300}",
                    },
                },
                "accent.subtle": {
                    value: {
                        _light: "{colors.accent.200}",
                        _dark: "{colors.accent.800}"
                    }
                },
                "error.default": {
                    value: {
                        _light: "{colors.error.600}",
                        _dark: "{colors.error.400}",
                    },
                },
                "error.emphasis": {
                    value: {
                        _light: "{colors.error.700}",
                        _dark: "{colors.error.300}",
                    },
                },
                "error.subtle": {
                    value: {
                        _light: "{colors.error.100}",
                        _dark: "{colors.error.900}",
                    },
                },
                "error.text": {
                    value: {
                        _light: "{colors.error.700}",
                        _dark: "{colors.error.300}",
                    },
                },
            },
        },
    },
    globalCss: {
        body: {
            bg: "bg.canvas",
            color: "text.primary",
            fontFamily: "body",
            fontSize: "md",
            lineHeight: "1.6",
        },
    },
})

export const system = createSystem(defaultConfig, customConfig)
