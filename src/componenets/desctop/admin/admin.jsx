import CreateSсore from './create-score/create-sсore';
import AdminParagraph from './paragraph/paragraph'
import ParagraphTitle from './paragraph/title/title';
import VerificationRequests from './verification-requests/requests';
import AdCreator from './create-ad/create-ad';

const AdminPanel = ({state, dispatch}) => {
	return (
		<div className="container">
			<AdminParagraph>
				<ParagraphTitle>Заявки на регистрацию ({state.verificationRequests.requests.length})</ParagraphTitle>
				<VerificationRequests state={state.verificationRequests} dispatch={dispatch}/>
			</AdminParagraph>
			<AdminParagraph>
				<ParagraphTitle>Добавление партитуры</ParagraphTitle>
				<CreateSсore state={state.createScore} dispatch={dispatch} />
			</AdminParagraph>
			<AdminParagraph>
				<ParagraphTitle>Добавление объявления</ParagraphTitle>
				<AdCreator state={state.addDraftData} dispatch={dispatch}/>
			</AdminParagraph>
		</div>
	)
}

export default AdminPanel;
