from math import inf

def validate_password(password):
    
    if len(password)<6:
        pwreason = ('password must be greater than or equal to 6 characters')
        return '',pwreason
    
    if len(password)>16:
        pwreason = ('password must be less than or equal to 16 characters')
        return '',pwreason
    return password,''
    
def StudentDistribution(no_of_groups, student_list, college_list, distribute_later):
    """Distributes the students according to there desires. The list should be sorted for greatest to smallest mark

    Args:
        no_of_groups (int): the number of groups that the students will be devided into
        student_list (list): list of list of students with their desires
        college_list (list): list of list of colleges with their capacities
        distribute_later (list): list of IDs of students that will be distributed later

    Returns:
        tuple: 2 list...The first for the students and their accepted desire, The second for the current capacities of colleges 
    """
    first_group = len(student_list)//no_of_groups
    StudentAcceptance = []
    capacity = []
    college = []
    for i in range(len(college_list)):
        college.append(college_list[i][0])
        college.append(0)
        capacity.append(college.copy())
        college = []
    for i in range(first_group):
        student_list[i].append(student_list[i][1])
        StudentAcceptance.append((student_list[i][0], student_list[i][1]))        
        capacity[student_list[i][1]-1][1]+=1

    bool=False
    for stud in range(first_group,len(student_list),1):
        for i in range(len(college_list)):
            if capacity[student_list[stud][i+1]-1][1] < college_list[student_list[stud][i+1]-1][1]:
                bool=True
                capacity[student_list[stud][i+1]-1][1]+=1
                student_list[i].append(student_list[stud][i+1])
                break
        
        if bool:
            bool=False
            StudentAcceptance.append((student_list[stud][0], student_list[stud][8]))

    for student in distribute_later:
        min_capacity=[0,inf]
        for i in range(len(capacity)):
            if capacity[i][1]>=college_list[i][1]:
                continue
            if capacity[i][1]<min_capacity[1]:
                min_capacity = capacity[i]
        
        for i in range(len(capacity)):
            if capacity[i]==min_capacity:
                capacity[i][1]+=1
                StudentAcceptance.append((student, capacity[i][0]))
                break
    return (StudentAcceptance, capacity)