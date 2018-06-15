import React from "react";
import PropTypes from "prop-types";
import picasso from "picasso.js";
import picassoQ from "picasso-plugin-q";

picasso.use(picassoQ);
export default class Scatterplot extends React.Component {
  static hideTooltip = () => {
    const elements = document.getElementsByClassName("tooltip");
    if (elements[0]) {
      document.body.removeChild(elements[0]);
    }
  };

  static showTooltip = (text, point) => {
    Scatterplot.hideTooltip();
    const currentTooltip = document.createElement("div");
    currentTooltip.appendChild(document.createTextNode(text));
    currentTooltip.classList.add("tooltip");

    document.body.appendChild(currentTooltip);

    // Reposition the tooltip
    currentTooltip.style.top = `${point.y}px`;
    currentTooltip.style.left = `${point.x + 5}px`;
  };

  constructor(...args) {
    super(...args);
    this.state = { pic: null };
  }

  renderPicasso() {
    const element = this.container;
    const data = [
      {
        type: "q",
        key: "qHyperCube",
        data: this.props.layout.qHyperCube
      }
    ];
    if (!this.state.pic) {
      const settings = {
        collections: [
          {
            key: "coll",
            data: {
              extract: {
                field: "qDimensionInfo/0",
                props: {
                  country: { value: v => v.qText },
                  income: { field: "qMeasureInfo/0" },
                  health: { field: "qMeasureInfo/1" },
                  urban: { field: "qMeasureInfo/2" }
                }
              }
            }
          }
        ],
        scales: {
          income: {
            data: { field: "qMeasureInfo/0" },
            min: -400,
            max: 41000,
            ticks: {
              values: [0, 40100]
            }
          },
          health: {
            data: { field: "qMeasureInfo/1" },
            invert: true,
            min: 25,
            max: 80,
            ticks: {
              values: [25, 77]
            }
          },
          urban: { data: { field: "qMeasureInfo/2" } }
        },
        components: [
          // {
          //   type: "axis",
          //   scale: "income",
          //   dock: "bottom",
          //   settings: { labels: { fill: "#f2f2f2" } }
          // },
          // {
          //   type: "axis",
          //   scale: "health",
          //   dock: "left",
          //   settings: { labels: { fill: "#f2f2f2" } }
          // },
          // {
          //   key: "xtitle",
          //   type: "text",
          //   text: "INCOME (GDP)",
          //   scale: "x",
          //   dock: "bottom",
          //   fontFamily: "Muli",
          //   style: {
          //     text: { fontFamily: "Muli", fill: "#f2f2f2" }
          //   }
          // },
          // {
          //   key: "ytitle",
          //   type: "text",
          //   text: "HEALTH (Life Expectancy)",
          //   scale: "y",
          //   dock: "left",
          //   style: {
          //     text: { fill: "#f2f2f2" }
          //   }
          // },
          {
            key: "points",
            type: "point",
            data: { collection: "coll" },
            brush: {
              trigger: [
                {
                  on: "over",
                  action: "set",
                  data: ["country"],
                  propagation: "stop",
                  contexts: ["tooltip"]
                }
              ],
              consume: [
                {
                  context: "tooltip"
                }
              ]
            },
            settings: {
              x: { scale: "income", ref: "income" },
              y: { scale: "health", ref: "health" },
              size: { scale: "urban", ref: "urban" },
              opacity: 0.8,
              fill: "#f68f00"
            }
          }
        ]
      };

      const pic = picasso.chart({
        element,
        data,
        settings
      });
      pic.brush("tooltip").on("update", added => {
        if (added.length) {
          const s = pic.getAffectedShapes("tooltip")[0];
          const rect = s.element.getBoundingClientRect();
          const p = {
            x: s.bounds.x + s.bounds.width + rect.x + 5,
            y: s.bounds.y + s.bounds.height / 2 + (rect.y - 28)
          };
          Scatterplot.showTooltip(s.data.country.value, p);
        } else {
          Scatterplot.hideTooltip();
        }
      });
      this.setState({ pic });
    } else {
      this.state.pic.update({ data });
    }
  }
  render() {
    // we need to have the `this.container` reference available when rendering:
    setTimeout(() => this.renderPicasso());
    return (
      <div
        className="picasso-chart"
        ref={elem => {
          this.container = elem;
        }}
      />
    );
  }
}

Scatterplot.propTypes = {
  layout: PropTypes.object.isRequired
};
