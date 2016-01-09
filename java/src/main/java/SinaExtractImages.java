import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.codec.Charsets;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.google.common.base.Strings;

public class SinaExtractImages {

	public static void main(String[] args) throws IOException {
		if (args.length == 1) {
			SinaExtractImages extractor = new SinaExtractImages();
			String url = args[0];
			System.out.println(url);
			extractor.download(url);
		}
	}

	public void download(String url) throws IOException {
		HttpClient httpclient = HttpClientBuilder.create().build();
		HttpGet httpget = new HttpGet(url);
		RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(10000).setConnectTimeout(10000).build();
		httpget.setConfig(requestConfig);
		HttpResponse response = httpclient.execute(httpget);
		HttpEntity entity = response.getEntity();
		String html = EntityUtils.toString(entity, Charsets.toCharset("UTF-8"));
		Document document = Jsoup.parse(html);
		Elements images = document.select(".articalContent a img,#articlebody p img");
		int size = images.size();
		System.out.println("images size is: " + size);
		for (int i = 0; i < size; i++) {
			Element image = images.get(i);
			String img = image.attr("real_src");
			if (!Strings.isNullOrEmpty(img)) {
				img = img.replace("mw690", "orignal");// .articalContent
				img = img.replace("mw600", "orignal");// #articlebody
				img = img.replace("middle", "orignal");// .articalContent
				img = img.replace("borignal", "orignal");// .articalContent
				String jpgname = i + ".jpg";
				if (i < 10) {
					jpgname = "00" + jpgname;
				} else if (i < 100) {
					jpgname = "0" + jpgname;
				}
				jpgname = "images/" + jpgname;
				saveImage(httpclient, img, jpgname);
			}
		}

	}

	private void saveImage(HttpClient httpclient, String img, String file) {
		try {
			System.out.println(img);
			HttpGet httpget = new HttpGet(img);
			// 设置请求和传输超时时间
			RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(30000).setConnectTimeout(30000).build();
			httpget.setConfig(requestConfig);
			HttpResponse response = httpclient.execute(httpget);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				// write the file to whether you want it.
				InputStream is = entity.getContent();
				FileOutputStream fos = new FileOutputStream(file);
				int inByte;
				while ((inByte = is.read()) != -1) {
					fos.write(inByte);
				}
				is.close();
				fos.close();
			}
		} catch (Exception e) {
			System.out.println("=========================");
			System.out.println(img);
			System.out.println("=========================");
		}
	}

}
