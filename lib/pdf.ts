import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: UserOptions) => void;
  }
}

interface ComponentData {
  name: string;
  type: string;
  config: {
    columns?: string[];
    data?: any[];
    value?: any;
    imageData?: string;
  };
}

export async function generatePDF(components: ComponentData[]) {
  const doc = new jsPDF();
  
  components.forEach((component, index) => {
    if (index > 0) {
      doc.addPage();
    }
    
    // 添加组件标题
    doc.setFontSize(16);
    doc.text(component.name, 14, 20);
    
    // 根据组件类型生成内容
    switch (component.type) {
      case "chart":
        if (component.config.imageData) {
          doc.addImage(component.config.imageData, 'PNG', 14, 30, 180, 100);
        }
        break;
      case "table":
        if (component.config.columns && component.config.data) {
          doc.autoTable({
            startY: 30,
            head: [component.config.columns],
            body: component.config.data,
          });
        }
        break;
      case "metric":
        doc.setFontSize(24);
        doc.text(component.config.value?.toString() || '', 14, 50);
        break;
      default:
        doc.setFontSize(12);
        doc.text(JSON.stringify(component.config), 14, 50);
    }
  });
  
  return doc.output("arraybuffer");
} 