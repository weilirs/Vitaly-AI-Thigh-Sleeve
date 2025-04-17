// Box shadow helper
export const boxShadowSm = "0 1px 2px rgba(0,0,0,0.05)";

// Color variables
export const colorGray50 = "#F9FAFB";
export const colorGray100 = "#F3F4F6";
export const colorGray200 = "#E5E7EB";
export const colorGray400 = "#9CA3AF";
export const colorGray500 = "#6B7280";
export const colorGray600 = "#4B5563";
export const colorGray700 = "#374151";
export const colorGray800 = "#1F2937";
export const colorGray900 = "#111827";
export const colorWhite = "#FFFFFF";
export const colorBlue50 = "#EFF6FF";
export const colorBlue100 = "#DBEAFE";
export const colorBlue500 = "#3B82F6";
export const colorBlue600 = "#2563EB";
export const colorBlue400 = "#60A5FA";
export const colorGreen50 = "#ECFDF5";
export const colorGreen500 = "#10B981";
export const colorOrange50 = "#FFF7ED";
export const colorOrange400 = "#FB923C";
export const colorPurple500 = "#A855F7"; 

// Utility function to get the color scheme for the zone chips based on MVC
export const getZoneColor = (mvc: number) => {
  // Return text color and background color for the "current zone" chip
  if (mvc >= 0.8)
    return {
      color: "#EF4444", // text-red-500
      backgroundColor: "#FEF2F2", // bg-red-50
    };
  if (mvc >= 0.6)
    return {
      color: "#F97316", // text-orange-500
      backgroundColor: "#FFF7ED", // bg-orange-50
    };
  if (mvc >= 0.4)
    return {
      color: "#F59E0B", // text-yellow-500
      backgroundColor: "#FFFBEB", // bg-yellow-50
    };
  return {
    color: "#10B981", // text-green-500
    backgroundColor: "#ECFDF5", // bg-green-50
  };
}; 