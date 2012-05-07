package hr.textsum;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class TextUtils {
	
	public static String readFile(String path) throws IOException {
		BufferedReader reader = new BufferedReader(new FileReader(path));
		StringBuffer sb = new StringBuffer();
		
		try {
			while (true) {
				String line = reader.readLine();
				if (line == null) break;
				sb.append(line).append('\n');
			}
		} finally {
			reader.close();
		}
		
		return sb.toString();
	}
}
