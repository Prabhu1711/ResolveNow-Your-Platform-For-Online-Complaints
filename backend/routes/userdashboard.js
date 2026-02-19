useEffect(() => {
    const fetchComplaints = async () => {
        try {
            const res = await axios.get(`http://localhost:5003/api/complaints/user/${userId}`);
            setComplaints(res.data);
        } catch (err) {
            console.error("Error fetching complaints:", err);
        }
    };

    fetchComplaints();
}, []);
