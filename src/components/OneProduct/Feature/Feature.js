import React, {useEffect, useState} from 'react';
import './Feature.css';

const Feature = ({product}) => {
    const[featurePanels,setFeaturePanels]=useState([]);
    // console.log('featurePanels:', featurePanels);
    // 新增状态来跟踪展开的面板:
    const [expandedPanels, setExpandedPanels] = useState([]);

    useEffect(() => {
        if (product && product.featurePanels) {
            const featurePanels = product.featurePanels.map(panel => {
                return {
                    title: panel.title,
                    content: panel.content ? panel.content : '',
                    icon: panel.iconPath
                };
            });
            setFeaturePanels(featurePanels); // Directly replace the existing state
        }
    }, [product]);


    const formatTitle = (title) => {
        return title.replace('(Click to Expand)', '').trim();
    }

    const togglePanel = (index) => {
        setExpandedPanels(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    }

    return (
        <div className={'featureContainer'} >
            {featurePanels.length>0&&featurePanels.map((panel,index)=>(
                <div key={index} style={{borderBottom: '1px solid lightgray', padding: '10px'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <img src={panel.icon} alt="" width={'30px'}/>
                        <div className={'featureTitle'} onClick={() => togglePanel(index)}>
                            {formatTitle(panel.title)}
                        </div>
                        {index !==0 && (
                            <button onClick={() => togglePanel(index)}
                                    style={{padding: '20px', border:'0, solid, white', backgroundColor:'white', cursor:'pointer'}}>
                                {expandedPanels.includes(index) ? '—' : '+'}
                            </button>)}
                    </div>
                    {expandedPanels.includes(index) && (
                        <div style={{color: 'black'}}>
                            {panel.content.length > 0 && panel.content.map((item, idx) => (
                                <div key={idx}
                                     style={{display:'flex', flexDirection:'column', justifyContent:'left', flexWarp:'wrap', backgroundColor:'#fafafa'}}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Feature;;