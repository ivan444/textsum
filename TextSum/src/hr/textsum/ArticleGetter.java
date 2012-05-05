package hr.textsum;

import java.io.IOException;
import java.net.URL;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.HTMLElements;
import net.htmlparser.jericho.MasonTagTypes;
import net.htmlparser.jericho.MicrosoftConditionalCommentTagTypes;
import net.htmlparser.jericho.NodeIterator;
import net.htmlparser.jericho.PHPTagTypes;
import net.htmlparser.jericho.Segment;
import net.htmlparser.jericho.Source;
import net.htmlparser.jericho.StartTag;
import net.htmlparser.jericho.StartTagType;
import net.htmlparser.jericho.Tag;

public class ArticleGetter {
	private static Set<String> skipElems;
	private static Set<String> goodElems;
	
	static {
		skipElems = new HashSet<String>();
		skipElems.add("applet");
		skipElems.add("area");
		skipElems.add("audio");
		skipElems.add("footer");
		skipElems.add("form");
		skipElems.add("head");
		skipElems.add("img");
		skipElems.add("noscript");
		skipElems.add("object");
		skipElems.add("script");
		skipElems.add("style");
		skipElems.add("video");
		
		goodElems= new HashSet<String>();
		goodElems.add("a");
		goodElems.add("body");
		goodElems.add("abbr");
		goodElems.add("acronym");
		goodElems.add("b");
		goodElems.add("big");
		goodElems.add("blockquote");
		goodElems.add("br");
		goodElems.add("center");
		goodElems.add("font");
		goodElems.add("h1");
		goodElems.add("h2");
		goodElems.add("h3");
		goodElems.add("h4");
		goodElems.add("h5");
		goodElems.add("h6");
		goodElems.add("i");
		goodElems.add("p");
		goodElems.add("pre");
		goodElems.add("s");
		goodElems.add("small");
		goodElems.add("span");
		goodElems.add("strike");
		goodElems.add("strong");
		goodElems.add("sub");
		goodElems.add("sup");
		goodElems.add("u");
		goodElems.add("em");

	}

	public static String dlArticle(String urlAddr) throws IOException {
		prepare();
		
		URL url = new URL(urlAddr);
		
		Source source = null;
		source = new Source(url);
		source.fullSequentialParse();
		
		return extractTextOld(source);
	}
	
	private static String extractText(Segment src) {
		List<Element> children = src.getChildElements();
		List<String> segments = new LinkedList<String>();
		StringBuffer sb = new StringBuffer();
		
		for (Element e : children) {
			sb = extractElementContent(e, sb, segments, src);
		}
		
		if (sb.length() > 0) {
			segments.add(sb.toString());
		}
		
		String max = "";
		for (String seg : segments) {
			if (seg.length() > max.length()) max = seg;
		}
		
		return max;
	}
	
	private static StringBuffer extractElementContent(Element e, StringBuffer sb, List<String> segments, Segment src) {
		List<Element> children = e.getChildElements();
		boolean skipElem = skipElems.contains(e.getName());
		boolean goodElem = goodElems.contains(e.getName());
		boolean breakElem = !skipElem && !goodElem;
		
		if (goodElem) {
			int prevIdx = e.getStartTag().getEnd();
			for (Element chld : children) {
				int end = chld.getStartTag().getBegin();
				if (end-prevIdx > 0) {
					String interContent = src.subSequence(prevIdx, end).toString();
					sb.append(interContent);
				}
				prevIdx = chld.getEnd();
				sb = extractElementContent(chld, sb, segments, src);
			}
			Tag endTag = e.getEndTag();
			if (endTag != null) {
				int end = endTag.getBegin();
				if (end-prevIdx > 0) {
					String lastSeg = src.subSequence(prevIdx, end).toString();
					sb.append(lastSeg);
				}
			}
			
		} else if (breakElem) {
			StringBuffer brkSb = new StringBuffer();
			for (Element chld : children) {
				brkSb = extractElementContent(chld, brkSb, segments, src);
			}
			
			if (brkSb.length() > 0) {
				segments.add(brkSb.toString());
			}
		}
		
		return sb;
	}

	private static String extractTextOld(Segment src) {
		String maxLenSeg = "";
		StringBuffer sb = new StringBuffer();
		
		for (NodeIterator nodeIterator=new NodeIterator(src); nodeIterator.hasNext();) {
			Segment segment=nodeIterator.next();
			if (segment instanceof Tag) {
				final Tag tag=(Tag)segment;
				if (tag.getTagType().isServerTag()) {
					// elementContainsMarkup should be made into a TagType property one day.
					// for the time being assume all server element content is code, although this is not true for some Mason elements.
					final Element element=tag.getElement();
					if (element!=null && element.getEnd()>tag.getEnd()) nodeIterator.skipToPos(element.getEnd());
					
				} else if (tag.getTagType()==StartTagType.NORMAL) {
					final StartTag startTag=(StartTag)tag;
					if (skipElems.contains(tag.name) || !HTMLElements.getElementNames().contains(tag.name)) {
						nodeIterator.skipToPos(startTag.getElement().getEnd());
						continue;
					}
					
					if (!goodElems.contains(tag.name)) {
						if (sb.length() > 0) {
							if (maxLenSeg.length() < sb.length()) {
								maxLenSeg = sb.toString();
							}
							sb.delete(0, sb.length());
						}
					}
				}
				
			} else {
				String segTxt = segment.getRenderer().setIncludeHyperlinkURLs(false).toString();
				sb.append(segTxt);
				
			}
		}
		
		if (sb.length() > 0) {
			if (maxLenSeg.length() < sb.length()) {
				maxLenSeg = sb.toString();
			}
		}
		
		return maxLenSeg;
	}
	
	private static void prepare() {
		MicrosoftConditionalCommentTagTypes.register();
		PHPTagTypes.register();
		PHPTagTypes.PHP_SHORT.deregister();
		MasonTagTypes.register();
	}

	public static void main(String[] args) throws IOException {
		String url;
//		url = "http://www.vecernji.hr/biznis/porez-imovinu-natjerat-ce-vlasnike-rasprodaju-stanova-clanak-405445";
//		url = "http://www.poslovni.hr/vijesti/niste-uzeli-racun-u-trgovini-kazna--500-kuna-203674.aspx";
//		url = "http://techcrunch.com/2012/05/03/samsung-galaxy-s-iii-officia/";
//		url = "http://www.hrt.hr/index.php?id=48&tx_ttnews[tt_news]=164163&tx_ttnews[backPid]=38&cHash=26edf8ba5d";
//		url = "http://www.huffingtonpost.com/2012/05/03/denmark-gay-bar-straight-kissing-_n_1475445.html";
		
//		url = "http://mashable.com/2012/05/03/facebook-zuckerberg-ipo/";
//		url = "http://www.tportal.hr/vijesti/hrvatska/191673/Jadranka-Kosor-je-kaznjena-zbog-seksa.html";
//		url = "http://www.tportal.hr/vijesti/hrvatska/191449/Hrvatski-narod-je-u-beznadu-i-ceka-nesto-novo-i-istinsko.html";
//		url = "http://www.vecernji.hr/vijesti/pocele-prve-blokade-isplata-placa-zbog-neplacenih-doprinosa-clanak-405371";
//		url = "http://h-alter.org/vijesti/ljudska-prava/nedopustivi-govor-mrznje";
//		url = "http://www.space.com/15531-supermoon-earthquake-tsunami.html";
//		url = "http://www.slobodnadalmacija.hr/Mozaik/tabid/80/articleType/ArticleView/articleId/173246/Default.aspx";
		url = "http://www.ibm.com/developerworks/java/library/j-codetoheap/index.html";
		
		System.out.println(dlArticle(url));
	}
	
}
