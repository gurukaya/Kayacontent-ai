import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

const demo = {
  product: "Contoh Produk Affiliate",
  price: "RM39.90",
  usp: "Mudah digunakan, menjimatkan masa dan sesuai untuk kegunaan harian.",
  target: "Orang yang mahu penyelesaian mudah dan praktikal."
};

function generate(product, platform, style, count){
  const p = product || demo.product;
  const ideas = [
    `“Aku ingat ${p} ni biasa-biasa je… rupanya benda ni yang paling memudahkan kerja aku.”`,
    `Kalau kau selalu pening dengan masalah yang ${p} selesaikan, tengok ni dulu.`,
    `Ramai orang cari ${p}, tapi sebenarnya mereka tersilap tengok satu benda ni.`,
    `POV: Kau jumpa ${p} yang buat kerja harian jadi jauh lebih senang.`,
    `Sebelum beli ${p}, 3 benda ni kau patut tahu.`
  ].slice(0, count);

  return {
    hooks: ideas,
    scripts: ideas.map((h,i)=>`${h}\\n\\nTerangkan masalah yang biasa dialami audience, kemudian tunjuk bagaimana ${p} membantu. Berikan satu bukti/kelebihan yang paling kuat dan tutup dengan CTA yang natural.`),
    captions: ideas.map(h=>`${h}\\n\\nKalau benda ni memang selesaikan masalah kau, boleh tengok detail produk sebelum buat keputusan. #affiliate #${platform.toLowerCase()}`),
    ctas: ideas.map((_,i)=>[
      "Nak tengok detail? Check link produk.",
      "Kalau rasa berguna, simpan dulu dan tengok kemudian.",
      "Klik untuk tengok harga dan maklumat penuh.",
      "Tengok dulu—mana tahu memang sesuai dengan keperluan kau.",
      "Kalau kau tengah cari benda macam ni, boleh consider."
    ][i])
  };
}

function App(){
  const [link,setLink]=useState("");
  const [platform,setPlatform]=useState("TikTok");
  const [style,setStyle]=useState("Soft Sell");
  const [count,setCount]=useState(5);
  const [product,setProduct]=useState(demo);
  const [result,setResult]=useState(null);

  const analyze=()=>setProduct({...demo, product: link ? "Produk daripada link (MVP demo)" : demo.product});
  const generateNow=()=>setResult(generate(product.product,platform,style,count));

  const copy = (text)=>navigator.clipboard?.writeText(text);

  return <main>
    <header><div className="logo">KayaContent <span>AI</span></div><div className="badge">MVP V1</div></header>
    <section className="hero">
      <p className="eyebrow">AFFILIATE CONTENT GENERATOR</p>
      <h1>Tukar produk kepada <em>content</em> yang orang nak tengok.</h1>
      <p className="sub">MVP pertama untuk jana hook, skrip, caption dan CTA dengan workflow yang ringkas.</p>
    </section>

    <section className="panel">
      <label>🔗 Link produk</label>
      <div className="row"><input value={link} onChange={e=>setLink(e.target.value)} placeholder="Paste link Shopee / TikTok Shop..." /><button onClick={analyze}>Analisis Produk</button></div>
      <div className="product"><b>{product.product}</b><span>{product.price}</span><p>{product.usp}</p><small>Target: {product.target}</small></div>

      <div className="grid">
        <div><label>Platform</label><select value={platform} onChange={e=>setPlatform(e.target.value)}><option>TikTok</option><option>Threads</option><option>Facebook</option></select></div>
        <div><label>Gaya content</label><select value={style} onChange={e=>setStyle(e.target.value)}><option>Soft Sell</option><option>Storytelling</option><option>Curiosity</option><option>Problem → Solution</option><option>Review</option><option>FOMO</option></select></div>
        <div><label>Bilangan</label><select value={count} onChange={e=>setCount(+e.target.value)}><option value="3">3</option><option value="5">5</option></select></div>
      </div>
      <button className="generate" onClick={generateNow}>✨ GENERATE CONTENT</button>
    </section>

    {result && <section className="results">
      <h2>Content yang dijana</h2>
      {Object.entries({Hooks:result.hooks,Skrip:result.scripts,Caption:result.captions,CTA:result.ctas}).map(([title,items])=>
        <div className="resultCard" key={title}><div className="cardHead"><h3>{title}</h3></div>
          {items.map((x,i)=><article key={i}><span>{i+1}</span><p>{x}</p><button onClick={()=>copy(x)}>Copy</button></article>)}
        </div>
      )}
    </section>}
    <footer>Prototype MVP V1 • AI provider akan disambungkan pada langkah seterusnya.</footer>
  </main>
}
createRoot(document.getElementById("root")).render(<App/>);