import { Chip, Rating } from '@mui/material';
import { useState, useEffect } from 'react';
import Graph from './graph/Graph';
import styles from './SubjectAnalysis.module.css';
import SubjectDetailAvg from './SubjectDetailAvg';
import StarIcon from '../../../images/StarIcon.svg';
import { StarRating } from '../../hooks/StarRating';
import { instance } from '../../utils/axios';
import { useRecoilState } from 'recoil';
import { errorState } from '../../utils/recoil/error';
import { useNavigate } from 'react-router';

const baseUrl = `${process.env.REACT_APP_END_POINT}`;
interface subject {
  sbjname: string;
}

interface sbjAvg {
  comment_cnt: number;
  avg_star_rating: number;
  total_star_rating: number[];
  time_taken?: { title: string; value: number; detail: number[] };
  amount_study?: { title: string; value: number; detail: number[] };
  bonus?: { title: string; value: number; detail: number[] };
  difficulty?: { title: string; value: number; detail: number[] };
}

// total_star_rating":[0,0,2,0,2]
export default function Analysis({ sbjname }: subject) {
  const [sbjAvg, setSbjAvg] = useState<sbjAvg>();
  const total = [5, 4, 3, 2, 1];
  const [error, setError] = useRecoilState(errorState);
  const navigate = useNavigate();

  useEffect(() => {
    getSbjAvg();
  }, []);

  const getSbjAvg = async () => {
    try {
      const res = await instance.get(`/subjects/${sbjname}/rating`);
      setSbjAvg(res.data);
    } catch (e) {
      setError('123');
      navigate('/error');
    }
  };

  function getPercentage(num1: number, num2: number) {
    const ret: Number = (num1 / num2) * 100;
    if (num2 === 0)
      return (0);
    console.log(num1, num2);
    return ret;
  }

  return (
    sbjAvg ? (
      <div className={styles.container}>
        <div className={styles.review}>리뷰 ({sbjAvg?.comment_cnt})</div>
        <div className={styles.flex}>
          <div className={styles.flexItem}>
            <div className={styles.borderRight}>
              <div
                className={styles.ratingStr}
              >{`${sbjAvg?.avg_star_rating}`}</div>
              <StarRating star_rating={sbjAvg.avg_star_rating} />
            </div>
          </div>
          <div className={styles.flexItem}>
            {total.map((value, i) => (
              <div key={i} className={styles.avgGraph && styles.minusMargin}>
                <span className={styles.smallFont}>{value}점</span>
                <div className={styles.bar_chart}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${
                        (sbjAvg.total_star_rating[value - 1] /
                          sbjAvg.comment_cnt) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className={styles.smallFont}>
                  <>
                    {
                      getPercentage(
                        sbjAvg.total_star_rating[value - 1],
                        sbjAvg.comment_cnt
                      )
                      // (sbjAvg.total_star_rating[value - 1] / sbjAvg.comment_cnt) *
                      // 100
                    }
                    %
                  </>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.avg_container}>
          {sbjAvg.time_taken !== undefined && (
            <SubjectDetailAvg
              name='소요시간'
              detail_title={`${sbjAvg?.time_taken?.title}`}
              detail_value={parseInt(`${sbjAvg?.time_taken?.value}`)}
              detail={sbjAvg?.time_taken?.detail}
            />
          )}
          {sbjAvg.difficulty !== undefined && (
            <SubjectDetailAvg
              name='난이도'
              detail_title={`${sbjAvg?.difficulty?.title}`}
              detail_value={parseInt(`${sbjAvg?.difficulty?.value}`)}
              detail={sbjAvg.difficulty.detail}
            />
          )}
          {sbjAvg.amount_study !== undefined && (
            <SubjectDetailAvg
              name='학습량'
              detail_title={`${sbjAvg?.amount_study?.title}`}
              detail_value={parseInt(`${sbjAvg?.amount_study?.value}`)}
              detail={sbjAvg?.amount_study?.detail}
            />
          )}
          {sbjAvg.bonus !== undefined && (
            <SubjectDetailAvg
              name='보너스'
              detail_title={`${sbjAvg.bonus.title}`}
              detail_value={parseInt(`${sbjAvg.bonus.value}`)}
              detail={sbjAvg.bonus.detail}
            />
          )}
        </div>
      </div>
    ) : <div></div>
  );
}
