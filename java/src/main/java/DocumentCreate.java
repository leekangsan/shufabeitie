import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public class DocumentCreate {

	public static void create(String authorName, File paper)
			throws DocumentException, IOException {
		String home = System.getProperty("user.home");
		String authorRoot = home + "/百度云同步盘/书法碑帖pdf/" + authorName;
		File author = new File(authorRoot);
		if (!author.exists()) {
			author.mkdirs();
		}
		String name = paper.getName();
		String pdfName = authorRoot + "/" + name + ".pdf";

		File file = new File(pdfName);
		if (file.exists()) {
			System.out.println("file exists: " + file.getCanonicalPath());
			return;
		}

		FileOutputStream fout = new FileOutputStream(file);
		Rectangle titlePage = new Rectangle(1000, 100);
		titlePage.setBackgroundColor(BaseColor.BLACK);
		Document document = new Document(titlePage, 0, 0, 0, 0);
		PdfWriter.getInstance(document, fout);
		document.open();

		BaseFont baseFont = BaseFont.createFont("yh.ttf", BaseFont.IDENTITY_H,
				BaseFont.EMBEDDED);
		Font chinese = new Font(baseFont, 24, Font.BOLD);
		chinese.setColor(255, 255, 255);
		Font site = new Font(baseFont, 12);
		site.setColor(255, 255, 255);

		PdfPTable titleTable = new PdfPTable(1);
		titleTable.setWidthPercentage(60);
		PdfPCell cell = new PdfPCell();

		Paragraph content = new Paragraph(name, chinese);
		content.setAlignment(Element.ALIGN_CENTER);
		cell.addElement(content);
		Paragraph website = new Paragraph("http://www.shufabeitie.com", site);
		website.setAlignment(Element.ALIGN_CENTER);
		cell.addElement(website);

		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cell.setPadding(0);
		cell.setBorder(0);
		cell.setFixedHeight(100);
		titleTable.addCell(cell);
		document.add(titleTable);

		File[] images = paper.listFiles();
		for (File image : images) {
			if (image.getName().contains(".jpg")) {
				String path = image.getCanonicalPath();
				Image img = Image.getInstance(path);
				float width = 1000;
				float height = img.getHeight() * width / img.getWidth();
				document.setPageSize(new Rectangle(width, height));
				img.scaleToFit(width, height);
				document.newPage();
				document.add(img);
			}
		}

		document.close();// 关闭文档
	}

	public static void main(String[] args) {
		String home = System.getProperty("user.home");
		String beitieRoot = home + "/shufabeitie/public/beitie";
		File root = new File(beitieRoot);
		File[] authors = root.listFiles();
		for (File author : authors) {
			if (author.isDirectory()) {
				String authorName = author.getName();
				File[] papers = author.listFiles();
				for (File paper : papers) {
					if (paper.isDirectory()) {
						try {
							System.out.println(paper.getName());
							create(authorName, paper);
						} catch (Exception e) {
							System.out.println(authorName);
							e.printStackTrace();
						}
					}
				}
			}
		}
		System.out.println("PDF文件创建完成");
	}

}