import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { instance } from '../../utils/axios';
import styles from './Admin.module.css';

interface sbj {
  subject_name: string;
  circle: number;
  subject_info: string;
  description: string;
}

export default function AdminList() {
  const [sbj, setSbj] = useState<sbj[]>([]);

  const getAdminList = async () => {
    const res = await instance.get(`admin/subjects/list`);
    setSbj(res.data);
  };

  useEffect(() => {
    getAdminList();
    console.log(sbj);
  }, []);

  return (
    <div>
      {sbj.map((data, index) => (
        <div
          key={index}
          style={{
            margin: '5px',
            border: '1px solid black',
            borderRadius: '5px',
            width: '500px',
            padding: '5px',
          }}
        >
          <div>
            <span
              style={{ fontWeight: '700', marginRight: '5px' }}
            >{`${data.circle}  `}</span>
            <span>{`${data.subject_name}  `}</span>
            <span> | </span>
            <span>{`${data.subject_info}  `}</span>
          </div>
          <div>
            <span>{`${data.description}  `}</span>
          </div>
          <button
            className={styles.btnWarning}
            onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              {
                await instance
                  .delete(`admin/subjects/${data.subject_name}/delete`)
                  .then(function (res) {
                    if (res.status) {
                      alert('삭제됐습니다.');
                      document.body.style.overflow = 'unset';
                    }
                  });
              }
            }}
          >
            삭제하기
          </button>
          <Link to={`/admin/${data.subject_name}`}>
            <button className={styles.btn}>수정하기</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
