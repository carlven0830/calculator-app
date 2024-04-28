import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [selectOption, setSelectOption] = useState(null);

  useEffect(function () {
    // Change the page title when the component mounts
    document.title = "CALCULATOR";
  }, []);

  function handleOptionTheme(optionIndex) {
    setSelectOption(optionIndex);

    const optionElements = document.querySelectorAll(".option");

    optionElements.forEach(function (element, index) {
      if (index === optionIndex) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });

    // Reset background color of all options
    document.querySelectorAll(".option").forEach(function (option) {
      option.style.background = ""; // Reset background color
    });

    // Update background color of .option.active based on optionIndex
    const activeColor =
      optionIndex === 2 ? "hsl(176, 100%, 44%)" : "hsl(25, 98%, 40%)";

    document
      .querySelectorAll(".option.active")
      .forEach(function (activeElement) {
        activeElement.style.background = activeColor;
      });

    // Update hover background color based on selected option
    const hoverOptionColor =
      optionIndex === 2 ? "hsl(176, 100%, 44%)" : "hsl(25, 98%, 40%)";

    // Update CSS dynamically for hover effect
    const styleOptionElement = document.createElement("style");
    styleOptionElement.innerHTML = `
      .option:hover {
        background: ${hoverOptionColor};
        cursor: pointer;
      }
    `;
    document.head.appendChild(styleOptionElement);

    const optionColor = [
      {
        body: "hsl(222, 26%, 31%)",
        color: "#fff",
        theme: "hsl(223, 31%, 20%)",
        toggle: "hsl(223, 31%, 20%)",
        screen: "hsl(224, 36%, 15%)",
      },
      {
        body: "hsl(0, 0%, 90%)",
        color: "hsl(60, 10%, 19%)",
        theme: "hsl(0, 5%, 81%)",
        toggle: "hsl(0, 5%, 81%)",
        screen: "hsl(0, 0%, 93%)",
      },
      {
        body: "hsl(268, 75%, 9%)",
        color: "hsl(52, 100%, 62%)",
        theme: "hsl(268, 71%, 12%)",
        toggle: "hsl(268, 71%, 12%)",
        screen: "hsl(268, 71%, 12%)",
      },
    ];

    const selectedColor = optionColor[optionIndex];

    document.body.style.background = selectedColor.body;
    document.body.style.color = selectedColor.color;
    document.querySelector(".theme").style.background = selectedColor.theme;
    document.querySelector(".toggle").style.background = selectedColor.toggle;
    document.querySelector(".screen").style.background = selectedColor.screen;
  }

  //calculation
  const [expression, setExpression] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [calculationPerformed, setCalculationPerformed] = useState(false);

  function handleNumberClick(number) {
    if (calculationPerformed) {
      setExpression(number.toString());
      setDisplayValue(number.toString());
      setCalculationPerformed(false);
    } else {
      const newExpression = expression + number.toString();
      setExpression(newExpression);
      setDisplayValue(newExpression);
    }
  }

  function handleOperatorClick(op) {
    const newExpression = expression + " " + op + " ";
    setExpression(newExpression);
    setOperator(op);
    setDisplayValue(newExpression);
    setCalculationPerformed(false);
  }

  function calculate() {
    const tokens = expression.split(" ");
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = parseFloat(tokens[i + 1]);
      switch (operator) {
        case "+":
          result += operand;
          break;
        case "-":
          result -= operand;
          break;
        case "x":
          result *= operand;
          break;
        case "/":
          if (operand === 0) {
            setDisplayValue("Error");
            return null;
          }
          result /= operand;
          break;
        default:
          return;
      }
    }
    // Round the result to 7 decimal places
    return parseFloat(result.toFixed(7));
  }

  function handleDelete() {
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
    setDisplayValue(newExpression === "" ? "0" : newExpression);
  }

  function handleReset() {
    setExpression("");
    setDisplayValue("0");
    setPreviousValue(null);
    setOperator(null);
    setCalculationPerformed(false);
  }

  function handleEqual() {
    const result = calculate();
    if (result !== null) {
      setOperator(null);
      setExpression(result.toString());
      setDisplayValue(result.toString());
      setCalculationPerformed(true);
    }
  }

  return (
    <div>
      <Container className="mt-4 p-0">
        <div className="w-45 m-auto w-md-100 p-4">
          <div className="w-100 m-auto">
            <Row className="p-0 m-0">
              <Col className="col-9-custom p-0"></Col>
              <Col className="col-1-custom p-0"></Col>
              <Col className="col-2-custom p-0 fw-bold d-flex justify-content-center">
                <p className="text-center w-33">1</p>
                <p className="text-center w-33">2</p>
                <p className="text-center w-33">3</p>
              </Col>
            </Row>
          </div>
          <div className="w-100 m-auto mb-5-custom">
            <Row className="align-items-center p-0 m-0">
              <Col className="col-9-custom p-0">
                <h2>calc</h2>
              </Col>
              <Col className="col-1-custom p-0">
                <p className="fw-bold fs-7 ls-wider">THEME</p>
              </Col>
              <Col className="theme col-2-custom rounded-pill p-0">
                <div className="h-100 w-100 p-1-custom m-0 d-flex justify-content-between align-items-center">
                  <div
                    className="option rounded-circle active"
                    onClick={() => handleOptionTheme(0)}
                  ></div>
                  <div
                    className="option rounded-circle"
                    onClick={() => handleOptionTheme(1)}
                  ></div>
                  <div
                    className="option rounded-circle"
                    onClick={() => handleOptionTheme(2)}
                  ></div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="screen ps-4 pe-4 d-flex align-items-center justify-content-end">
            <p className="fs-custom fw-bold">{displayValue}</p>
          </div>
          <div className="toggle p-custom">
            <Row className="m-0 mb-custom">
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(7)}
              >
                7
              </Col>
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(8)}
              >
                8
              </Col>
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(9)}
              >
                9
              </Col>
              <Col
                className={`key-blue k-${selectOption} fs-3 fw-bold text-center p-1 p-md-1 d-flex justify-content-center align-items-center`}
                onClick={handleDelete}
              >
                DEL
              </Col>
            </Row>
            <Row className="m-0 mb-custom">
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(4)}
              >
                4
              </Col>
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(5)}
              >
                5
              </Col>
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(6)}
              >
                6
              </Col>
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center p-1 p-md-1`}
                onClick={() => handleOperatorClick("+")}
              >
                +
              </Col>
            </Row>
            <Row className="m-0 mb-custom">
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(1)}
              >
                1
              </Col>
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(2)}
              >
                2
              </Col>
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(3)}
              >
                3
              </Col>
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center p-1 p-md-1`}
                onClick={() => handleOperatorClick("-")}
              >
                -
              </Col>
            </Row>
            <Row className="m-0 mb-custom">
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(".")}
              >
                .
              </Col>
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleNumberClick(0)}
              >
                0
              </Col>
              <Col
                className={`key k-${selectOption} fs-1-custom fw-bold text-center me-custom p-1 p-md-1`}
                onClick={() => handleOperatorClick("/")}
              >
                /
              </Col>
              <Col
                className={`key k-${selectOption} fs-2-custom  fw-bold text-center p-1 p-md-1 d-flex justify-content-center align-items-center`}
                onClick={() => handleOperatorClick("x")}
              >
                x
              </Col>
            </Row>
            <Row className="m-0">
              <Col
                className={`key-blue k-${selectOption} fs-3 fw-bold text-center me-custom p-3-custom d-flex justify-content-center align-items-center`}
                onClick={handleReset}
              >
                RESET
              </Col>
              <Col
                className={`key-red k-${selectOption} fs-3 fw-bold text-center p-3-custom`}
                onClick={handleEqual}
              >
                =
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
