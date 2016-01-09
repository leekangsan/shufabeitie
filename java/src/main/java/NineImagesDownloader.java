import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

public class NineImagesDownloader {

	public static void main(String[] args) throws IOException {
		if (args.length == 1) {
			NineImagesDownloader extractor = new NineImagesDownloader();
			String url = args[0];
			System.out.println(url);
			extractor.download(url, "images");
		}
	}

	public void download(String url, String dir) throws IOException {
		Set<String> set = new HashSet<String>();
		Matcher matcher = Pattern.compile("(^.*/)[^\\/]+.html?",
				Pattern.CASE_INSENSITIVE).matcher(url);
		if (matcher.find()) {
			HttpClient httpclient = HttpClientBuilder.create().build();
			HttpGet httpget = new HttpGet(url);
			RequestConfig requestConfig = RequestConfig.custom()
					.setSocketTimeout(10000).setConnectTimeout(10000).build();
			httpget.setConfig(requestConfig);
			HttpResponse response = httpclient.execute(httpget);
			HttpEntity entity = response.getEntity();
			String html = EntityUtils.toString(entity,
					Charsets.toCharset("GBK"));
			String base = matcher.group(1);
			System.out.println(base);
			Document document = Jsoup.parse(html);

			// download images
			Elements links = document.select("p a");
			int imgSize = links.size();
			System.out.println("links size is: " + imgSize);
			for (int i = 0; i < imgSize; i++) {
				Element link = links.get(i);
				String img = base + link.attr("href");
				if (!Strings.isNullOrEmpty(img)
						&& img.toLowerCase().contains(".jpg")) {
					int pos = (i + 1) * 2;
					String jpgname = pos + ".jpg";
					if (pos < 10) {
						jpgname = "00" + jpgname;
					} else if (pos < 100) {
						jpgname = "0" + jpgname;
					}
					jpgname = dir + "/" + jpgname;
					System.out.println(img);
					if (!set.contains(img)) {
						saveImage(httpclient, img, jpgname);
						set.add(img);
					} else {
						System.out.println(img + " already exists!");
					}
				}
			}

			// info.json
			String text = "";
			document.select("p").first().remove();
			Elements paraphases = document.select("p");
			for (Element element : paraphases) {
				String pt = element.text().replaceAll("\u0020\u3000", "")
						.trim();
				if (Strings.isNullOrEmpty(pt) || pt.contains("扫描")
						|| pt.contains("下载") || pt.contains("提供")
						|| pt.contains("返回")) {
					element.remove();
				} else {
					text += pt + "\n";
				}
			}
			List<Info> versions = new ArrayList<Info>();
			Info info = new Info();
			info.setText(text);
			versions.add(info);

			System.out.println(text);
			Files.write(new Gson().toJson(versions), new File(dir
					+ "/info.json"), Charsets.UTF_8);
		}

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
