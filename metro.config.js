const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Enable SVG support
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

// Remove .svg from assetExts and add to sourceExts
const assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
const sourceExts = [...config.resolver.sourceExts, "svg"];

config.resolver.assetExts = assetExts;
config.resolver.sourceExts = sourceExts;

// Apply NativeWind
module.exports = withNativeWind(config, { input: "./global.css" });
