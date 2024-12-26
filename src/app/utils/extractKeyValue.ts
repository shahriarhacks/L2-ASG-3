function extractKeyValue(errorMsg: string): { key: string; value: string } {
   const regex = /\{ ([^:]+): "([^"]+)" \}/;
   const match = errorMsg.match(regex);

   if (match) {
      const key = match[1]; // Extracted key (e.g., "name")
      const value = match[2]; // Extracted value (e.g., "Department of Testing")
      return { key, value };
   }

   return { key: "", value: "Duplicate key entry" };
}

export default extractKeyValue;
