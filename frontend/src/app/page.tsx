'use client';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {CssBaseline, CssVarsProvider, Sheet, Table, Typography} from "@mui/joy";
import Head from "next/head";

export default function Home() {
    const [data, setData] = useState(null);
    const [users, setUsers] = useState(null);
    const [snippets, setSnippets] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://127.0.0.1:8000/');
            setData(res.data);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchSnippets() {
            if (data) {
                const res = await axios.get(data.snippets);
                setSnippets(res.data);
            }
        }

        async function fetchUsers() {
            if (data) {
                const res = await axios.get(data.users);
                setUsers(res.data);
            }
        }

        if (data) {
            fetchSnippets();
            fetchUsers();
        }
    }, [data]);

    return (
        <CssBaseline>
            <CssVarsProvider defaultMode="system">
                <Head>
                    <meta charSet="UTF-8"/>
                    <title>Tutorial</title>
                </Head>
                <Sheet
                    variant="outlined"
                    sx={{
                        m: 4,
                        p: 2,
                        width: "1fr",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        borderRadius: "sm",
                        boxShadow: "md",
                    }}>
                    {data && (
                        <Sheet sx={{
                            width: "100%",
                            overflow: "auto",
                        }}>
                            <Typography level="h3">Users</Typography>
                            <Table hoverRow>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Snippets</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users && (
                                    users.results.map(user => (
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.snippets.length}</td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </Table>
                            <br/>


                            <Typography level="h3">Snippets</Typography>
                            <Table hoverRow>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Language</th>
                                    <th>Owner</th>
                                    <th>Code</th>
                                </tr>
                                </thead>
                                <tbody>
                                {snippets && (
                                    snippets.results.map(snippet => (
                                        <tr>
                                            <td>{snippet.id}</td>
                                            <td>{snippet.title}</td>
                                            <td>{snippet.language.charAt(0).toUpperCase() + snippet.language.slice(1)}</td>
                                            <td>{snippet.owner}</td>
                                            <td>{snippet.code}</td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </Table>
                        </Sheet>
                    )}
                </Sheet>
            </CssVarsProvider>
        </CssBaseline>
    );
}
