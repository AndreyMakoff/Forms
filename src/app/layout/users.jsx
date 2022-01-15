import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import GroupList from "../components/groupList";
import api from "../api";
import _ from "lodash";
import SearchStatus from "../components/searchStatus";
import UserTable from "../components/userTable";
import { useParams } from "react-router-dom";
import UserPage from "../components/userpage";
import SearchInput from "../components/searchInput";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSearchValue("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const params = useParams();
    const { userId } = params;
    if (userId) {
        return <UserPage id={userId} />;
    }

    const handleSort = (item) => {
        setSortBy(item);
    };
    let filteredUsers;
    if (users) {
        if (selectedProf) {
            filteredUsers = users.filter(
                (user) => user.profession._id === selectedProf._id
            );
        } else {
            if (searchValue !== "") {
                const searchRegExp = new RegExp(searchValue, "i");
                filteredUsers = users.filter((user) =>
                    searchRegExp.test(user.name)
                );
            } else {
                filteredUsers = users;
            }
        }

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSearchValue("");
            setSelectedProf();
        };
        const handleSearch = ({ target }) => {
            setSelectedProf();
            setSearchValue(target.value);
        };
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            valueProperty="_id"
                            contentProperty="name"
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="flex flex-column">
                    {<SearchStatus length={count} />}
                    <SearchInput
                        onChange={handleSearch}
                        searchValue={searchValue}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-counter">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading....";
};
Users.propTypes = {
    users: PropTypes.array
};

export default Users;
