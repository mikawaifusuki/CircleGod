import * as XLSX from "xlsx";

export async function generateExcel(components: any[]) {
  const workbook = XLSX.utils.book_new();
  
  components.forEach((component, index) => {
    let worksheet;
    
    switch (component.type) {
      case "table":
        worksheet = XLSX.utils.json_to_sheet(component.config.data);
        break;
      case "metric":
        worksheet = XLSX.utils.aoa_to_sheet([
          [component.name],
          [component.config.value]
        ]);
        break;
      default:
        worksheet = XLSX.utils.aoa_to_sheet([
          [component.name],
          [JSON.stringify(component.config)]
        ]);
    }
    
    XLSX.utils.book_append_sheet(workbook, worksheet, `Sheet${index + 1}`);
  });
  
  return XLSX.write(workbook, { type: "array", bookType: "xlsx" });
} 