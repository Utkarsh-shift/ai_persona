

function WebSocketConnectMethod( config ) { 

	
	var speechSokt;
	var connKeeperID;
	
	var msgHandle = config.msgHandle;
	var stateHandle = config.stateHandle;
			  
	this.wsStart = function () {
		var Uri = document.getElementById('wssip').value; 
		if(Uri.match(/wss:\S*|ws:\S*/))
		{
			console.log("Uri"+Uri);
		}
		else
		{
			alert("请检查wss地址正确性");
			return 0;
		}
 
		if ( 'WebSocket' in window ) {
			speechSokt = new WebSocket( Uri ); 
			speechSokt.onopen = function(e){onOpen(e);}; 
			speechSokt.onclose = function(e){
			    console.log("onclose ws!");
			    //speechSokt.close();
				onClose(e);
				};
			speechSokt.onmessage = function(e){onMessage(e);};
			speechSokt.onerror = function(e){onError(e);};
			return 1;
		}
		else {
			alert('当前浏览器不支持 WebSocket');
			return 0;
		}
	};
	

	this.wsStop = function () {
		if(speechSokt != undefined) {
			console.log("stop ws!");
			speechSokt.close();
		}
	};
	
	this.wsSend = function ( oneData ) {
 
		if(speechSokt == undefined) return;
		if ( speechSokt.readyState === 1 ) { 
 
			speechSokt.send( oneData );
 
			
		}
	};
	

	function onOpen( e ) {
		
		var request = {
			"chunk_size": chunk_size,
			"wav_name":  "h5",
			"is_speaking":  true,
			"chunk_interval":10,
			"itn":getUseITN(),
			"mode":getAsrMode(),
			
		};
		if(isfilemode)
		{
			request.wav_format=file_ext;
			if(file_ext=="wav")
			{
				request.wav_format="PCM";
				request.audio_fs=file_sample_rate;
			}
		}
		
		var hotwords=getHotwords();
 
		if(hotwords!=null  )
		{
			request.hotwords=hotwords;
		}
		console.log(JSON.stringify(request));
		speechSokt.send(JSON.stringify(request));
		console.log("连接成功");
		stateHandle(0);
 
	}
	
	function onClose( e ) {
		stateHandle(1);
	}
	
	function onMessage( e ) {
 
		msgHandle( e );
	}
	
	function onError( e ) {
 
		info_div.innerHTML="连接"+e;
		console.log(e);
		stateHandle(2);
		
	}
    
 
}