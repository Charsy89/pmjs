// Charsy

var pmVersion = "0.1.4";

append = src=>{
	var s = document.createElement('SCRIPT');
	s.src = src;
	document.body.appendChild(s);
}

word_filter = [
		"﷽",
		"𒀱",
		"𒅃",
		"𒈓",
		"꧅"
];

filter = word=>{
	let regexp = new RegExp("\\b("+word_filter.join('|')+")\\b", "i");
	return regexp.test(word)
}

append("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"); // Using AES to encrypt/decrypt

sendPM = (t,m)=>{
	var msg = {a:CryptoJS.AES.encrypt(m,MPP.client.findParticipantById(t)._id.substr(0,5)).toString()};
	var p = MPP.client.getOwnParticipant();
	var arr = [];
	MPP.chat.receive({a:m,p:{name:"(S) "+p.name,color:p.color,_id:p._id,id:p.id},t:Date.now()});
	('\0'+msg.a).match(/.{1,5}/g).forEach(a=>arr.push({n:a}));
	arr.push({n:MPP.client.findParticipantById(t)._id.substr(0,5)});
	MPP.client.sendArray([{m:'n',t:7,n:arr}]);
};

receivePM = (m,i)=>{
	if(filter(m)) return;
	var a = {a:m,t:Date.now()};
	var p = MPP.client.findParticipantById(i);
	if(filter(p.name)) return;
	a.p = {name:"(S) "+p.name,color:p.color};
	MPP.chat.receive(a);
};


MPP.client.on("n",m=>{
	if(!m.n[0].v && m.t == 7 && m.n[m.n.length-1].n == MPP.client.getOwnParticipant()._id.substr(0,5)){
		var enc = "";
		for(var i=0; i < m.n.length-1; i++)
			enc += m.n[i].n;
		if(enc[0] !== "\0") return;
		var str = "";
		str = CryptoJS.AES.decrypt(enc.slice(1),MPP.client.getOwnParticipant()._id.substr(0,5)).toString(CryptoJS.enc.Utf8);
		if(str == "") str = "PMJS: Unable to decrypt!";
		receivePM(str,m.p);
	};
});

console.log("%c"+
 "+========================+\n"
+"|          PMJS          |\n"
+"|                        |\n"
+`| Version:         ${pmVersion} |\n`
+"+========================+",
"color:#505050;");
