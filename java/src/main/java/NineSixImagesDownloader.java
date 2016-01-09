import java.io.File;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.codec.Charsets;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class NineSixImagesDownloader {

	public static void main(String[] args) throws IOException {
		if (args.length == 1) {
			NineSixImagesDownloader downloader = new NineSixImagesDownloader();
			String url = args[0];
			System.out.println(url);
			downloader.download(url);
		} else {
			NineSixImagesDownloader downloader = new NineSixImagesDownloader();
			String url = "http://www.9610.com/sushi/1.htm";
			downloader.download(url);
		}
	}

	public void download(String url) throws ClientProtocolException,
			IOException {
		String reg1 = "(^.*/)[^\\/]+.html?";
		Pattern pattern = Pattern.compile(reg1, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(url);
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
			int papers = links.size();
			System.out.println("papers size is: " + papers);
			for (int i = 0; i < papers; i++) {
				Element link = links.get(i);
				String paper = base + link.attr("href");
				System.out.println(paper);
				matcher = pattern.matcher(paper);
				if (matcher.find()) {
					String reg = "[^\u4e00-\u9fa5]";
					String text = link.text().trim().replaceAll(reg, "");
					String dir = "images/" + text;
					System.out.println(dir);
					File file = new File(dir);
					if (!file.exists()) {
						file.mkdirs();
					}
					NineImagesDownloader nid = new NineImagesDownloader();
					nid.download(paper, dir);
				}
			}
		}
	}
}
