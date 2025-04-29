import { stringify } from "csv-stringify/sync";

interface ComponentData {
  name: string;
  type: string;
  config: {
    columns?: string[];
    data?: any[];
    value?: any;
  };
}

export async function generateCSV(components: ComponentData[]) {
  const csvData: (string | number | null)[][] = [];
  
  components.forEach(component => {
    switch (component.type) {
      case "table":
        if (component.config.columns) {
          csvData.push(component.config.columns);
        }
        if (component.config.data) {
          component.config.data.forEach((row: any[]) => {
            csvData.push(row);
          });
        }
        break;
      case "metric":
        csvData.push([component.name, component.config.value?.toString() || '']);
        break;
      default:
        csvData.push([component.name, JSON.stringify(component.config)]);
    }
    // 添加分隔行
    csvData.push([]);
  });
  
  return stringify(csvData);
} 