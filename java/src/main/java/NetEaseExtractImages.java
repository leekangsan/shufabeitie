import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

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
import com.google.common.io.Files;
import com.google.gson.Gson;

public class NetEaseExtractImages {

	public static void main(String[] args) throws IOException {
		if (args.length == 1) {
			NetEaseExtractImages extractor = new NetEaseExtractImages();
			String url = args[0];
			System.out.println(url);
			extractor.download(url);
		}
	}

	public void download(String url) throws IOException {
		HttpClient httpclient = HttpClientBuilder.create().build();
		HttpGet httpget = new HttpGet(url);
		RequestConfig requestConfig = RequestConfig.custom()
				.setSocketTimeout(10000).setConnectTimeout(10000).build();
		httpget.setConfig(requestConfig);
		HttpResponse response = httpclient.execute(httpget);
		HttpEntity entity = response.getEntity();
		String html = EntityUtils.toString(entity, Charsets.toCharset("GBK"));
		Document document = Jsoup.parse(html);

		// download images
		Elements images = document.select(".nbw-blog img");
		int imgSize = images.size();
		System.out.println("images size is: " + imgSize);
		for (int i = 0; i < imgSize; i++) {
			Element image = images.get(i);
			String img = image.attr("src");
			if (!Strings.isNullOrEmpty(img)
					&& img.toLowerCase().contains(".jpg")) {
				int pos = (i + 1) * 2;
				String jpgname = pos + ".jpg";
				if (pos < 10) {
					jpgname = "00" + jpgname;
				} else if (pos < 100) {
					jpgname = "0" + jpgname;
				}
				jpgname = "images/" + jpgname;
				System.out.println(img);
				saveImage(httpclient, img, jpgname);
			}
		}

		// info.json
		String text = document.select(".nbw-blog").text();
		List<Info> versions = new ArrayList<Info>();
		Info info = new Info();
		info.setText(text.replaceAll(" ", ""));
		versions.add(info);

		System.out.println(text);
		Files.write(new Gson().toJson(versions), new File("images/info.json"),
				Charsets.UTF_8);
	}

	private void saveImage(HttpClient httpclient, String img, String file) {
		try {
			HttpGet httpget = new HttpGet(img);
			// 设置请求和传输超时时间
			RequestConfig requestConfig = RequestConfig.custom()
					.setSocketTimeout(30000).setConnectTimeout(120000).build();
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
