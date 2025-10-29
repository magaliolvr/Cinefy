import PropTypes from "prop-types";
import "./TabNavigation.scss";


function TabNavigation({ tabs = [] }) {
    // TabNavigation agora recebe uma prop chamada tabs, que é um array de objetos. Cada objeto representa uma aba e deve conter as propriedades title (título da aba) e content (conteúdo da aba).
    if (tabs.length === 0) return null;
    //   Se não houver abas, não renderiza nada.

    return (
        <div className="box-tab">
            {/* Inputs dinâmicos */}
            {tabs.map((tab, index) => (
                <input key={tab.id || index} className="radio" id={`tab-${index}`} name="tab-group" type="radio" defaultChecked={index === 0}
                />
            ))}

            {/* Labels (abas) */}
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <label key={tab.id || index} className="tab" htmlFor={`tab-${index}`}>
                        {tab.title}
                    </label>
                ))}
            </div>

            {/* Conteudo */}
            <div className="panels">
                {tabs.map((tab, index) => (
                    <div key={tab.id || index} className="panel">
                        <h2 className="tab-title">{tab.title}</h2>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}

TabNavigation.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired,
        })
    ).isRequired,
};

export default TabNavigation;
