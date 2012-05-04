package hr.textsum;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
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
	 * @param fwPath Path to text file containing fws.
	 * @return Set of function words (lowercased).
	 * @throws IOException 
	 */
	private Set<String> loadFws(String fwPath) throws IOException {
		BufferedReader fileReader = new BufferedReader(
				new FileReader(fwPath));
		Set<String> fwords = new HashSet<String>();
		char ch;
		
		while ((ch = (char) fileReader.read()) != -1) {
			
		}
		
		return null;
	}
		
	private List<String> sentences(String text) {
		int len = text.length();
//		for (int i = 0; i < len; i++) {
//			char ch = text.charAt(i);
//			if (ch == '?' || ch == '!' || ch == '.') {
//			    sentences.append((curSnt,ch))
//			    curSnt = ""
//			  else:
//			    curSnt += ch
//		}
		return null;
		
	}


	public static void main(String[] args) {
		
	}

}
