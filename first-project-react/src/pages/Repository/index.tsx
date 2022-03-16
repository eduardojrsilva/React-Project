import React, { useEffect, useState } from "react";
import { useParams, Link  } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/logo.svg';

interface RepositoryInterface {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}

const Repository: React.FC = () => {
    const [repository, setRepository] = useState<RepositoryInterface | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    const params = useParams();

    useEffect(() => {
        api.get(`repos/${params.author}/${params.repository}`).then(response => {
            setRepository(response.data);
        });
        api.get(`repos/${params.author}/${params.repository}/issues`).then(response => {
            setIssues(response.data);
        });

        // async function loadData(): Promise<void> {
        //     const [repository, issues] = await Promisse.all([ // Promisse.all permite executar mais de uma chamada ao mesmo tempo
        //         api.get(`repos/${params.author}/${params.repository}`),
        //         api.get(`repos/${params.author}/${params.repository}/issues`)
        //     ]);
        // }
    }, [params.author, params.repository]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to={"/"}>
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map(issue => (
                    <a key={issue.id} href={issue.html_url}>
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Issues>
        </>
    );
}

export default Repository;