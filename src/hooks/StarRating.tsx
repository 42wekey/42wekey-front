import styles_star from "./StarRating.module.css";
import { ReactComponent as EmptyStar } from "../svg/emptyStar.svg";

interface Star {
	star_rating: number;
  }

export function StarRating({ star_rating }: Star) {
	return (
	  <>
		<EmptyStar
		  fill={star_rating > 0 ? "#FEDB22" : "#F9F9F9"}
		  stroke={star_rating > 0 ? "#FEDB22" : "#E8E8E8"}
		  className={styles_star.star}
		/>
		<EmptyStar
		  fill={star_rating > 1 ? "#FEDB22" : "#F9F9F9"}
		  stroke={star_rating > 1 ? "#FEDB22" : "#E8E8E8"}
		  className={styles_star.star}
		/>
		<EmptyStar
		  fill={star_rating > 2 ? "#FEDB22" : "#F9F9F9"}
		  stroke={star_rating > 2 ? "#FEDB22" : "#E8E8E8"}
		  className={styles_star.star}
		/>
		<EmptyStar
		  fill={star_rating > 3 ? "#FEDB22" : "#F9F9F9"}
		  stroke={star_rating > 3 ? "#FEDB22" : "#E8E8E8"}
		  className={styles_star.star}
		/>
		<EmptyStar
		  fill={star_rating > 4 ? "#FEDB22" : "#F9F9F9"}
		  stroke={star_rating > 4 ? "#FEDB22" : "#E8E8E8"}
		  className={styles_star.star}
		/>
	  </>
	);
  }