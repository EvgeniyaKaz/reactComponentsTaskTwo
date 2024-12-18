import styles from "./app.module.css";
import data from "./data.json";
import { useState } from "react";

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const clickBack = () => {
		setActiveIndex(activeIndex - 1);
	};
	const clickForward = () => {
		setActiveIndex(activeIndex + 1);
	};
	const clickStartedOver = () => {
		setActiveIndex(0);
	};

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let isValidFirstStep = true;
	activeIndex <= 0 ? (isValidFirstStep = false) : (isValidFirstStep = true);

	let isValidLastStep = true;
	activeIndex >= 6 ? (isValidLastStep = false) : (isValidLastStep = true);

	const activeContent = () => {
		const active = steps[activeIndex]
		const activeText = active.content
		return activeText
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>
						{activeContent()}

					</div>
					<ul className={styles["steps-list"]}>
						{
							steps.map(({ id, title }) =>
								<li className={activeIndex === (parseInt(id, 10) - 1)
									?
									styles["steps-item"] +
									" " +
									styles.done +
									" " +
									styles.active
									: activeIndex < (parseInt(id, 10) - 1)
										? styles["steps-item"]
										: styles["steps-item"] + " " + styles.done
								} key={id}>
									<button className={styles["steps-item-button"]}
										onClick={() => { setActiveIndex(parseInt(id, 10) - 1) }} key={id}
									>{parseInt(id, 10)}</button>
									{title}
								</li>)
						}
					</ul>
					<div className={styles["buttons-container"]}>
						<button
							className={styles.button}
							onClick={clickBack}
							disabled={!isValidFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={activeIndex >= 6 ? clickStartedOver : clickForward}
							disabled={activeIndex >= 6 ? false : !isValidLastStep}
						>
							{activeIndex >= 6 ? "Начать сначала" : "Далее"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
