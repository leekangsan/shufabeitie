import java.io.IOException;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.parser.PdfReaderContentParser;

/**
 * Extracts images from a PDF file.
 */
public class ExtractImages {

	public static final String SOURCE_PDF = "pdfs/test.pdf";

	public void extractImages(String filename, String destination) throws IOException {
		System.out.println("Processing PDF at " + filename);
		System.out.println("Saving images to " + destination);

		PdfReader reader = new PdfReader(filename);
		PdfReaderContentParser parser = new PdfReaderContentParser(reader);
		ImageRenderListener listener = new ImageRenderListener(destination + "/img-%s.%s");
		for (int i = 1; i <= reader.getNumberOfPages(); i++) {
			try {
				parser.processContent(i, listener);
			} catch (Exception e) {
				System.out.println("error - " + e.getMessage());
			}
		}
		reader.close();
	}

	public static void main(String[] args) throws IOException, DocumentException {
		String src = SOURCE_PDF;
		String home = System.getProperty("user.home");
		String beitieRoot = home + "/shufabeitie/java/";
		if (args.length == 1) {
			src = beitieRoot + "pdfs/" + args[0] + ".pdf";
		}
		String dest = beitieRoot + "/images";

		new ExtractImages().extractImages(src, dest);
	}
}