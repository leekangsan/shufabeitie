

import java.io.FileOutputStream;
import java.io.IOException;

import com.itextpdf.text.pdf.parser.ImageRenderInfo;
import com.itextpdf.text.pdf.parser.PdfImageObject;
import com.itextpdf.text.pdf.parser.RenderListener;
import com.itextpdf.text.pdf.parser.TextRenderInfo;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Saves images to a directory.
 *
 * @author mnguyen
 */
public class ImageRenderListener implements RenderListener {

    /**
     * The directory path to store images.
     */
    protected String path;

    /**
     * Creates a RenderListener that will look for images.
     */
    public ImageRenderListener(String path) {
        this.path = path;
    }

    /**
     * @see com.itextpdf.text.pdf.parser.RenderListener#beginTextBlock()
     */
    @Override
    public void beginTextBlock() {
    }

    /**
     * @see com.itextpdf.text.pdf.parser.RenderListener#endTextBlock()
     */
    @Override
    public void endTextBlock() {
    }

    /**
     * @see com.itextpdf.text.pdf.parser.RenderListener#renderImage(
     * com.itextpdf.text.pdf.parser.ImageRenderInfo)
     */
    @Override
    public void renderImage(ImageRenderInfo renderInfo) {
        try {
            String filename;
            FileOutputStream os;
            PdfImageObject image = renderInfo.getImage();
            if (image == null) {
                return;
            }
            filename = String.format(path, renderInfo.getRef().getNumber(), image.getFileType());
            System.out.println("Writing image to file: " + filename);
            os = new FileOutputStream(filename);
            os.write(image.getImageAsBytes());
            os.flush();
            os.close();
        } catch (IOException e) {
            Logger.getLogger(ImageRenderListener.class.getName()).log(Level.SEVERE, null, e);
        }
    }

    /**
     * @see com.itextpdf.text.pdf.parser.RenderListener#renderText(
     * com.itextpdf.text.pdf.parser.TextRenderInfo)
     */
    @Override
    public void renderText(TextRenderInfo renderInfo) {
    }
}