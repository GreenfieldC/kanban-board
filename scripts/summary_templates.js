'use strict';

/**
 * @returns {string} html for the summary page
 */
const generateSummaryHtml = () => {
	return /*html*/ `
	<div class="heading-container">
		<span class="description-heading">Kanban Project Management Tool</span>
		<div class="title">Summary</div>
		<div class="subtitle">Everything in a nutshell</div>
	</div>

	<div class="overview-greeting-container">
		<!-- Overview -->
		<div class="overview-container">
			<div class="top-cards-overview">
				<div class="card-overview" role="button">
					<div id="tasks-in-board" class="cardOverviewValue">5</div>
					<div class="overview-card-name">Tasks<br />in Board</div>
				</div>
				<div class="card-overview" role="button">
					<div id="tasks-in-progress" class="cardOverviewValue">2</div>
					<div class="overview-card-name">Tasks In<br />Progress</div>
				</div>
				<div class="card-overview" role="button">
					<div id="awaiting-feedback" class="cardOverviewValue">3</div>
					<div class="overview-card-name">Awaiting<br />Feedback</div>
				</div>
			</div>
			<div class="urgent-container" role="button">
				<div id="urgent-tasks" class="urgent-tasks">
					<div class="urgent-tasks-container">
						<div class="icon">
							<svg class="urgent-icon" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="30" cy="30" r="30" fill="#FF3D00" />
								<g clip-path="url(#clip0_36881_2303)">
									<path d="M44.8709 41.1626C44.4699 41.1633 44.0792 41.0337 43.7563 40.7929L29.6511 30.263L15.5458 40.7929C15.3478 40.941 15.1229 41.0482 14.8839 41.1084C14.645 41.1685 14.3966 41.1805 14.1531 41.1435C13.9096 41.1066 13.6757 41.0214 13.4647 40.893C13.2536 40.7645 13.0697 40.5953 12.9233 40.3949C12.777 40.1945 12.6711 39.9669 12.6116 39.7251C12.5522 39.4832 12.5404 39.2319 12.5769 38.9855C12.6507 38.4878 12.9168 38.0402 13.3167 37.7411L28.5365 26.3677C28.8591 26.126 29.2498 25.9956 29.6511 25.9956C30.0524 25.9956 30.4431 26.126 30.7657 26.3677L45.9855 37.7411C46.3033 37.9781 46.5389 38.3106 46.6588 38.6912C46.7788 39.0718 46.7768 39.481 46.6532 39.8604C46.5296 40.2398 46.2907 40.57 45.9706 40.8039C45.6506 41.0377 45.2657 41.1633 44.8709 41.1626Z" fill="white" />
									<path d="M44.8708 31.2109C44.4697 31.2116 44.0791 31.082 43.7562 30.8413L29.651 20.3114L15.5457 30.8413C15.1458 31.1404 14.6448 31.2665 14.153 31.1919C13.6612 31.1172 13.2188 30.8479 12.9232 30.4432C12.6276 30.0385 12.503 29.5315 12.5768 29.0339C12.6506 28.5362 12.9167 28.0885 13.3166 27.7894L28.5364 16.416C28.859 16.1744 29.2497 16.0439 29.651 16.0439C30.0523 16.0439 30.443 16.1744 30.7655 16.416L45.9854 27.7894C46.3031 28.0264 46.5388 28.359 46.6587 28.7396C46.7786 29.1202 46.7767 29.5294 46.6531 29.9088C46.5295 30.2882 46.2906 30.6184 45.9705 30.8522C45.6505 31.0861 45.2656 31.2116 44.8708 31.2109Z" fill="white" />
								</g>
								<defs>
									<clipPath id="clip0_36881_2303">
										<rect width="34.186" height="25.1163" fill="white" transform="translate(12.5581 16.0464)" />
									</clipPath>
								</defs>
							</svg>
						</div>
						<div class="urgent-value-name-container">
							<div class="cardOverviewValue">3</div>
							<div class="overview-card-name">Urgent</div>
						</div>
					</div>
					<div class="deadline-container">
						<div class="deadline-value">June 1, 2023</div>
						<div class="deadline-title">Upcoming Deadline</div>
					</div>
				</div>
			</div>
			<div class="do-done-container" role="button">
				<div class="do-container card-overview fb-100 flex-row do-done-box">
					<svg class="svg-summary-do-done" width="24" height="34" viewBox="0 0 24 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.61559 29.262L3.05082 25.8847L17.211 2.55302C17.7841 1.60874 19.0141 1.30784 19.9584 1.88092L22.1037 3.1829C23.0479 3.75598 23.3488 4.98604 22.7758 5.93031L8.61559 29.262Z" fill="currentColor" />
						<path d="M7.94001 30.3749L2.37524 26.9976L3.23136 30.4972C3.36259 31.0337 3.90387 31.3622 4.44034 31.231L7.94001 30.3749Z" fill="currentColor" />
					</svg>
					<div class="to-do-done-values-container">
						<div id="to-do" class="cardOverviewValue">3</div>
						<div class="overview-card-name">To-Do</div>
					</div>
				</div>
				<div class="done-container card-overview fb-100 flex-row do-done-box" role="button">
					<svg class="svg-summary-do-done" width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.27832 15.0001L15.5071 26.0662L34.2217 3.93408" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<div class="to-do-done-values-container">
						<div id="done" class="cardOverviewValue">3</div>
						<div class="overview-card-name">Done</div>
					</div>
				</div>
			</div>
		</div>
		<div class="greeting-container">
			<div class="greeting">
				<div id="greeting-title" class="greeting-title">Good Morning,</div>
				<span id="greeting-name" class="greeting-name">Christian Greenfield</span>
			</div>
		</div>
	</div>`;
};
