package hr.textsum.android;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.HTMLElementName;
import net.htmlparser.jericho.MasonTagTypes;
import net.htmlparser.jericho.MicrosoftConditionalCommentTagTypes;
import net.htmlparser.jericho.PHPTagTypes;
import net.htmlparser.jericho.Source;
import net.htmlparser.jericho.StartTag;
import net.htmlparser.jericho.TextExtractor;

import hr.textsum.ArticleGetter;
import hr.textsum.ExtractText;
import hr.textsum.R;
import hr.textsum.Summarization;
import android.app.Activity;
import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.TextView.OnEditorActionListener;

public class SkracenkoActivity extends Activity {
	
	TextView shorted;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        final EditText search = (EditText) findViewById(R.id.search);
        Button go = (Button) findViewById(R.id.searchbutton);
        shorted = (TextView) findViewById(R.id.shorted);
        go.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				performClick(search);
			}
		});
        
        search.setOnEditorActionListener(new OnEditorActionListener() {
			
			@Override
			public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
				performClick(search);
				return true;
			}
		});
        
    }

    private void performClick(EditText search) {
    	
		new GetData().execute(search.getText().toString());
		search.setText("");
	}
    
    class GetData extends AsyncTask<String, Void, String>{

    	ProgressDialog pd;

    	@Override
    	protected void onPreExecute() {
    		pd = ProgressDialog.show(SkracenkoActivity.this, "Downloading", "Please wait...");
		}
		
    	@Override
		protected String doInBackground(String... params) {
    		String url = null;
    		if(!params[0].startsWith("http://"))
    			url = "http://"+params[0];
    		else
    			url = params[0];

			try {
				return ArticleGetter.dlArticle(url);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}
    	
    	@Override
    	protected void onPostExecute(String result) {
    		pd.dismiss();
    		if(result != null)
    			shorted.setText(result);
    	}
    }
}