package hr.textsum;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Summarization {
	private Set<String> fwords;

	public Summarization(String fwPath) {
		try {
			fwords = loadFws(fwPath);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Load function words from text file.
	 * 
	 * @param fwPath
	 *            Path to text file containing fws.
	 * @return Set of function words (lowercased).
	 * @throws IOException
	 */
	private Set<String> loadFws(String fwPath) throws IOException {
		BufferedReader fileReader = new BufferedReader(new FileReader(fwPath));
		Set<String> fwords = new HashSet<String>();

		while (true) {
			String line = fileReader.readLine();
			if (line == null) break;
			line = line.trim();
			if (line.length() == 0) continue;
			char c0 = line.charAt(0);
			if (c0 == '.' || c0 == '#') {
				continue;
			} else {
				fwords.add(line.toLowerCase());
			}
		}

		fileReader.close();

		return fwords;
	}

	/**
	 * Split text into sentences.
	 * 
	 * @param text
	 * @return List of pairs <sentence, sentenceType> (types are: ?/./!).
	 */
	private List<Tuple<String,Character>> sentences(String text) {
		List<Tuple<String,Character>> sentences = new LinkedList<Tuple<String,Character>>();
		StringBuffer curSnt = new StringBuffer();
		
		int len = text.length();
		for (int i = 0; i < len; i++) {
			char ch = text.charAt(i);
			if (ch == '?' || ch == '!' || ch == '.') {
			    sentences.add(
			    		new Tuple<String, Character>(
			    				curSnt.toString(), Character.valueOf(ch)));
			    curSnt.delete(0, curSnt.length());
			} else {
			    curSnt.append(ch);
			}
		}
		
		return sentences;
		
	}
	
//	private String[] split(String str) {
//		int len = str.length();
//		StringBuffer sb = new StringBuffer();
//		List<String> splitted = new LinkedList<String>();
//		
//		for (int i = 0; i < len; i++) {
//			char ch = str.charAt(i);
//			if (ch == ' ' || ch == '\t' || ch == '\r' || ch == '\n') {
//				if (sb.length() > 0) {
//					splitted.add(sb.toString());
//					sb.delete(0, sb.length());
//				}
//			} else {
//				sb.append(ch);
//			}
//		}
//		
//		if (sb.length() > 0) {
//			splitted.add(sb.toString());
//		}
//		
//		return splitted.toArray(new String[0]);
//	}
	
	private List<SentenceDescriptor> calcSntDesc(String text) {
		List<Tuple<String,Character>> sentences = sentences(text);
		int sntCnt = sentences.size();
		Map<String, Integer> dft = new HashMap<String, Integer>(); // term 'document' frequency
		List<SentenceDescriptor> fwdist = new LinkedList<SentenceDescriptor>();
		int maxWNum = 0;
		int sntNum = 1;
		
		for (Tuple<String,Character> tuple : sentences) {
			String snt = tuple.first;
			char stype = tuple.second.charValue();
			
			String[] wrds = snt.split("[,\\s]+");
			//String[] wrds = split(snt);
			int wrdsNum = wrds.length;
			maxWNum = Math.max(maxWNum, wrdsNum);
			
			if (wrdsNum == 0) continue;
			
			int fwNum = 0;
			Set<String> wset = new HashSet<String>();
			Map<String, Integer> tf = new HashMap<String, Integer>(); // term frequency
			for (int i = 0; i < wrds.length; i++) {
				String w = wrds[i];
				if (fwords.contains(w)) fwNum += 1;
				else {
					String lw = w.toLowerCase();
					wset.add(lw);
					Integer oldFreq = tf.get(lw);
					if (oldFreq == null) oldFreq = Integer.valueOf(0);
					tf.put(lw, oldFreq+1);
				}
				
				for (String lw : wset) {
					Integer oldFreq = dft.get(lw);
					if (oldFreq == null) oldFreq = Integer.valueOf(0);
					dft.put(lw, oldFreq+1);
				}
			}
			
			double ratio = (double) fwNum/wrdsNum;
			SentenceDescriptor sd = new SentenceDescriptor(
					snt, wrdsNum, fwNum, ratio, sntNum, stype, tf);
			
			sntNum++;
			
			fwdist.add(sd);
		}
		
		// calc idf
		Map<String, Double> idft = new HashMap<String, Double>();
		for (String lw : dft.keySet()) {
			double freq = dft.get(lw).doubleValue();
			idft.put(lw, Math.abs(Math.log10( (double)sntCnt/freq )));
		}

		// calc tfidf
		double maxTfidf = 0.0;
		for (SentenceDescriptor sd : fwdist) {
			Map<String, Double> tfidf = sd.tfidf;
			
			for (String t : sd.tf.keySet()) {
				int f = sd.tf.get(t).intValue();
				tfidf.put(t, f*idft.get(t));
				maxTfidf = Math.max(tfidf.get(t), maxTfidf);
			}
		}
		
		// calc score
		for (SentenceDescriptor sd : fwdist) {
			char stype = sd.stype;
			int wrdsNum = sd.wrdsNum;
			double typeScore = 0.0;
			double orderScore = 0.0;
			
			if (stype == '.') typeScore = 0.6;
			else if (stype == '!') typeScore = 0.3;
			else if (stype == '?') typeScore = 0.2;
			
			if (sd.sntNum == 1) orderScore = 0.6;
			
			for (String t : sd.tfidf.keySet()) {
				double v = sd.tfidf.get(t).doubleValue();
				double mf = min3(sd.min3tfidf);
				if (mf < v) {
					if (sd.min3tfidf[0] == mf) sd.min3tfidf[0] = v;
					else if (sd.min3tfidf[1] == mf) sd.min3tfidf[1] = v;
					else if (sd.min3tfidf[2] == mf) sd.min3tfidf[2] = v;
				}
			}
			double score = (sd.ratio + (double) wrdsNum / maxWNum
					+ typeScore + sum(sd.min3tfidf)/(maxTfidf*sd.min3tfidf.length)
					+ orderScore) / 7.0;
			sd.setScore(score);
		}
		
		Collections.sort(fwdist);
		
		return fwdist;
	}
	
	public String genSummarization(String text) {
		StringBuffer sb = new StringBuffer();
		List<SentenceDescriptor> sDescs = calcSntDesc(text);
		
		List<SentenceDescriptor> choosenSnts = sDescs.subList(0, 3);
		Collections.sort(choosenSnts, new Comparator<SentenceDescriptor>() {
			@Override
			public int compare(SentenceDescriptor o1, SentenceDescriptor o2) {
				return o1.sntNum-o2.sntNum;
			}
		});
		
		for (SentenceDescriptor sd : choosenSnts) {
			sb.append(sd.sentence).append(sd.stype).append(' ');
		}
		
		return sb.toString();
	}
	
	private double min3(double[] arr) {
		if (arr[0] <= arr[1] && arr[0] <= arr[2]) return arr[0];
		else if (arr[1] <= arr[0] && arr[1] <= arr[2]) return arr[1];
		else return arr[2];
	}
	
	private double sum(double[] arr) {
		double sum = 0.0;
		for (int i = 0; i < arr.length; i++) {
			sum += arr[i];
		}
		return sum;
	}
	
	public static void main(String[] args) throws IOException {
		Summarization s = new Summarization("resource/fwords.txt");
		//String text = TextUtils.readFile("texts/02.txt");
		String text = ArticleGetter.dlArticle("http://www.vecernji.hr/biznis/porez-imovinu-natjerat-ce-vlasnike-rasprodaju-stanova-clanak-405445");
		String sum = s.genSummarization(text);
		System.out.println(sum);
	}
	
	private class SentenceDescriptor implements Comparable<SentenceDescriptor> {
		public final String sentence;
		public final int wrdsNum;
//		public final int fwNum;
		public final double ratio;
		public final int sntNum;
		public final char stype;
		public final Map<String, Integer> tf;
		public final Map<String, Double> tfidf;
		public final double[] min3tfidf;
		private double score;
		
		public SentenceDescriptor(String sentence, int wrdsNum, int fwNum,
				double ratio, int sntNum, char stype, Map<String, Integer> tf) {
			this.sentence = sentence;
			this.wrdsNum = wrdsNum;
//			this.fwNum = fwNum;
			this.ratio = ratio;
			this.sntNum = sntNum;
			this.stype = stype;
			this.tf = tf;
			this.tfidf = new HashMap<String, Double>();
			this.min3tfidf = new double[] {0.0, 0.0, 0.0};
		}

		public double getScore() {
			return score;
		}

		public void setScore(double score) {
			this.score = score;
		}

		@Override
		public int compareTo(SentenceDescriptor o) {
			double diff = getScore()-o.getScore();
			if (Math.abs(diff) < 1e-6) return 0;
			else if (diff < 0) return 1; // DESC!!
			else return -1; // DESC!!
		}
		
		
	}

}
