import { changeSearchData } from "../../../../redux/actions/changeSearchData";
import { loadSearchResult } from "../../../../redux/actions/loadSearchResults";
import Results from "./results/results"
import style from "./search.module.css"

const Search = ({searchResults, dispatch}) => {
	return(
		<div className={style.container}
		onFocus={() => dispatch(changeSearchData({canShowResults: true}))}
		onBlur={() => {
			setTimeout(() => {
				dispatch(changeSearchData({canShowResults: false}))
			}, 500)
		}}
		>
			<input
			placeholder="Поиск"
			name="search"
			type="text"
			autoComplete="off"
			value={searchResults.inputData}
			onChange={(event) => {
				const request = event.target.value;
				if (request === ''){
					dispatch(changeSearchData({inputData: request}));
					dispatch(changeSearchData({scores: []}));
					dispatch(changeSearchData({canShowResults: false}))
				}else{
					dispatch(changeSearchData({canShowResults: true}))
					dispatch(changeSearchData({inputData: request}));
					dispatch(loadSearchResult(request))
				}

			}}
			className={style.box}/>
			<label htmlFor="search">
			<Results results={searchResults.canShowResults ? searchResults.scores : []} dispatch={dispatch}/>
			</label>
		</div>
	);
}

export default Search;
